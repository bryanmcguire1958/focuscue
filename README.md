# FocusCue

A cross-platform desktop overlay app for content creators and presenters, featuring a countdown timer with visual thresholds and a focal dot for camera awareness.

## Quick Start

### Development (Web Only)
```bash
npm install
npm run dev
```

Then open http://localhost:5173

### OBS Browser Source Setup

1. Add a Browser Source in OBS
2. Use this URL with your desired parameters:
```
http://localhost:5173/overlay?duration=300&warn=60&panic=20&dot=14&opacity=0.7
```
3. Check "Transparent background"
4. Set width/height to match your canvas

## Features

- **Countdown Timer**: Color-coded thresholds (green → amber → red)
- **Focal Dot**: Adjustable red dot for eye focus/camera awareness  
- **OBS Integration**: Transparent overlay route for streaming
- **Hotkeys** (Main app):
  - `Space`: Start/Stop timer
  - `R`: Reset timer
  - `F8`: Toggle overlay visibility

## URL Parameters for OBS

- `duration`: Timer duration in seconds (default: 300)
- `warn`: Warning threshold in seconds (default: 60)
- `panic`: Panic threshold in seconds (default: 20)
- `dot`: Dot size in pixels (default: 14)
- `opacity`: Overlay opacity 0-1 (default: 0.7)
- `x`: Dot X position percentage (default: 50)
- `y`: Dot Y position percentage (default: 50)
- `color`: Dot color hex code (default: #ff2a2a)

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- (Tauri support coming soon for desktop app)

## Development Notes

- Run from Windows Terminal (not WSL) when adding Tauri
- Project location: C:\Users\bryan\Dropbox\focuscue-app