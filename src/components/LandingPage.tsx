import React from 'react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-white text-2xl font-bold">FocusCue</div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-white hover:opacity-80 transition-opacity">Features</a>
            <a href="#obs" className="text-white hover:opacity-80 transition-opacity">OBS Setup</a>
            <button 
              onClick={() => window.location.pathname = '/app'} 
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Launch App
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            100% Free • No Sign-up Required
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Professional Presenter Tools
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Elegant timer and teleprompter overlay for streamers, content creators, and presenters.<br/>
            Works seamlessly with OBS and any streaming software.
          </p>
          <button 
            onClick={() => window.location.pathname = '/app'}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg"
          >
            Launch App Now →
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional presentation tools that help you deliver confident, engaging content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Timer</h3>
              <p className="text-gray-600">
                Visual countdown with color transitions. Green → Amber → Red thresholds keep you on track during presentations.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Teleprompter</h3>
              <p className="text-gray-600">
                Auto-scroll or step-through modes. Adjustable speed and font size for comfortable reading during presentations.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Focus Dot</h3>
              <p className="text-gray-600">
                Adjustable red dot for camera focus assistance. Customizable size, opacity, and position for any setup.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full Control</h3>
              <p className="text-gray-600">
                Customize every aspect - timer thresholds, overlay opacity, teleprompter speed. Save settings automatically.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">⌨️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Keyboard Shortcuts</h3>
              <p className="text-gray-600">
                Space to start/stop, R to reset, arrow keys for teleprompter navigation. Professional workflow support.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Web-Based</h3>
              <p className="text-gray-600">
                No downloads or installations. Works in any browser on Windows, Mac, Linux. Always up-to-date.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Use</h2>
              <p className="text-xl text-gray-600 mb-6">
                FocusCue is designed for immediate productivity. Clean interface, professional aesthetics, and intuitive controls.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Quick setup presets (1min, 3min, 5min)',
                  'Presentation mode for distraction-free delivery',
                  'Auto-saving settings and scripts',
                  'Responsive design for any screen size',
                  'Professional color schemes and typography',
                  'Streamlined user journey'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="text-green-500 font-bold mr-3">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => window.location.pathname = '/app'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-colors"
              >
                Try It Now
              </button>
            </div>
            
            <div className="bg-gray-300 rounded-xl h-80 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-lg">App Interface Preview</p>
                <p className="text-sm">Clean, Professional Design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OBS Integration Section */}
      <section id="obs" className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Perfect OBS Integration</h2>
          <p className="text-xl mb-12 opacity-90">
            Add professional overlays to your streams in minutes
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Add Browser Source',
                description: 'In OBS, add a new Browser Source to your scene'
              },
              {
                step: '2',
                title: 'Enter URL',
                description: 'Use the /overlay route with your custom parameters'
              },
              {
                step: '3',
                title: 'Configure Settings',
                description: 'Enable "Transparent background" and set canvas dimensions'
              },
              {
                step: '4',
                title: 'Go Live',
                description: 'Professional timer and overlays appear automatically'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-6 rounded-xl">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-8 mb-6">
            <button 
              onClick={() => window.location.pathname = '/app'}
              className="text-white hover:opacity-80 transition-opacity"
            >
              Launch App
            </button>
            <a href="#features" className="text-white hover:opacity-80 transition-opacity">Features</a>
            <a href="#obs" className="text-white hover:opacity-80 transition-opacity">OBS Setup</a>
          </div>
          <p className="text-gray-400 mb-2">© 2025 FocusCue. Professional presenter tools for everyone.</p>
          <p className="text-gray-500 text-sm">Free web-based application • No registration required • Privacy focused</p>
        </div>
      </footer>
    </div>
  );
};