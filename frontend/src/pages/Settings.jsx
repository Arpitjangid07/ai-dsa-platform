// src/pages/Settings.jsx
import React, { useState } from 'react';

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true); // Defaulting to dark for now

  const handleToggle = () => {
    setDarkMode(!darkMode);
    // Here, you'd persist to context/localStorage/theme logic later
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-xl mx-auto bg-slate-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">⚙️ Settings</h1>

        <div className="space-y-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Dark Mode</span>
            <button
              onClick={handleToggle}
              className={`w-14 h-8 flex items-center rounded-full px-1 transition ${
                darkMode ? 'bg-green-500' : 'bg-gray-500'
              }`}
            >
              <div
                className={`bg-white w-6 h-6 rounded-full shadow-md transform transition ${
                  darkMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* More coming soon */}
          <div className="text-slate-400 text-sm italic">More preferences coming soon...</div>
        </div>
      </div>
    </div>
  );
}
