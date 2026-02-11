import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initAnalytics } from './analytics';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Initialize Amplitude analytics (requires VITE_AMPLITUDE_API_KEY in env)
initAnalytics();
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);