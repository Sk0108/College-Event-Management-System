import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    setLoggedIn(!!token);
  }, []);

  return loggedIn ? (
    <Dashboard onLogout={() => {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      setLoggedIn(false);  // properly update state
    }} />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
