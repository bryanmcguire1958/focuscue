// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{tray::{Menu, MenuItem, TrayIconBuilder, TrayIconEvent}, Manager, WebviewUrl, WebviewWindowBuilder};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn toggle_always_on_top(window: tauri::WebviewWindow) -> Result<(), String> {
    let is_always_on_top = window.is_always_on_top().map_err(|e| e.to_string())?;
    window.set_always_on_top(!is_always_on_top).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
async fn create_overlay_window(app: tauri::AppHandle) -> Result<(), String> {
    let _overlay_window = WebviewWindowBuilder::new(
        &app,
        "overlay",
        WebviewUrl::App("overlay".into())
    )
    .title("FocusCue Overlay")
    .inner_size(800.0, 600.0)
    .transparent(true)
    .decorations(false)
    .always_on_top(true)
    .skip_taskbar(true)
    .build()
    .map_err(|e| e.to_string())?;
    
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let toggle_overlay = MenuItem::with_id("toggle_overlay", "Toggle Overlay", true, None::<&str>);
    let always_on_top = MenuItem::with_id("always_on_top", "Toggle Always On Top", true, None::<&str>);
    let quit = MenuItem::with_id("quit", "Quit", true, None::<&str>);
    
    let menu = Menu::with_items(&[&toggle_overlay, &always_on_top, &quit]).unwrap();
    
    tauri::Builder::default()
        .setup(|app| {
            let _tray = TrayIconBuilder::new()
                .menu(&menu)
                .icon(app.default_window_icon().unwrap().clone())
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "quit" => {
                        app.exit(0);
                    }
                    "toggle_overlay" => {
                        if let Some(overlay_window) = app.get_webview_window("overlay") {
                            let is_visible = overlay_window.is_visible().unwrap_or(false);
                            if is_visible {
                                let _ = overlay_window.hide();
                            } else {
                                let _ = overlay_window.show();
                            }
                        } else {
                            let _ = create_overlay_window(app.clone());
                        }
                    }
                    "always_on_top" => {
                        if let Some(main_window) = app.get_webview_window("main") {
                            let _ = toggle_always_on_top(main_window);
                        }
                    }
                    _ => {}
                })
                .on_tray_icon_event(|tray, event| match event {
                    TrayIconEvent::Click { button: tauri::tray::MouseButton::Left, .. } => {
                        if let Some(app) = tray.app_handle().get_webview_window("main") {
                            if app.is_visible().unwrap_or(false) {
                                let _ = app.hide();
                            } else {
                                let _ = app.show();
                                let _ = app.set_focus();
                            }
                        }
                    }
                    _ => {}
                })
                .build(app)?;
            
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, toggle_always_on_top, create_overlay_window])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn main() {
    run();
}