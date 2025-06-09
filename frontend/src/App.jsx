import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/StudentDashboard';

// Main App Component
// This component manages the application state, handles user authentication, and routes to different dashboards based on user roles.
function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('access'));

  return loggedIn ? (
    <Dashboard />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
