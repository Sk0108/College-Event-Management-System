import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import StaffDashboard from './components/StaffDashboard';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(null); // null = loading, true/false = known
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    const userRole = localStorage.getItem('role');

    if (token && userRole) {
      setLoggedIn(true);
      setRole(userRole);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setRole(null);
  };

  const onLogin = (userRole) => {
    setLoggedIn(true);
    setRole(userRole);
  };

  const getDashboard = () => {
    if (role === 'admin') return <AdminDashboard onLogout={handleLogout} />;
    if (role === 'staff') return <StaffDashboard onLogout={handleLogout} />;
    if (role === 'student') return <StudentDashboard onLogout={handleLogout} />;
    return <Navigate to="/" />;
  };

  if (loggedIn === null) {
    // Optional loading indicator while checking
    return <div style={{ color: 'white', padding: '2rem' }}>Loading...</div>;
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route path="/dashboard" element={loggedIn ? getDashboard() : <Navigate to="/" />} />
        <Route path="/admin/dashboard" element={loggedIn && role === 'admin' ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="*" element={<h2 style={{ padding: '2rem', color: 'white' }}>404 - Page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
