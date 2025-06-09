import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// Main entry point for the React application
// This file initializes the React application, renders the main App component, and sets up performance reporting.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
