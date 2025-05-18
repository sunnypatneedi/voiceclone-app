import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Main entry point for the Voice Clone application
 * Renders the main application component to the DOM
 */
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
