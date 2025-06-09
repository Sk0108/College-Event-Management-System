import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/StudentDashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('access'));

  return loggedIn ? (
    <Dashboard />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
