import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { OnboardingProvider } from './context/OnboardingContext';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <OnboardingProvider>
          <App />
        </OnboardingProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
