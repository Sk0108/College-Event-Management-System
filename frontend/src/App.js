// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import StudentLogin from './components/Login';
import StaffLogin from './pages/StaffLogin';
import Dashboard from './components/Dashboard';
import StaffDashboard from './components/StaffDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RegisterForm from './pages/RegisterForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // 'student', 'staff', or 'admin'
  

  useEffect(() => {
    const token = localStorage.getItem('access');
    const userRole = localStorage.getItem('role');
    setLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('role');
    setLoggedIn(false);
    setRole(null);
  };

  const getDashboard = () => {
    if (role === 'admin') return <AdminDashboard onLogout={handleLogout} />;
    if (role === 'staff') return <StaffDashboard onLogout={handleLogout} />;
    return <Dashboard onLogout={handleLogout} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register-form/:eventId" element={<RegisterForm />} />
        <Route path="/student/login" element={<StudentLogin onLogin={(r) => {
          setLoggedIn(true);
          setRole(r);
        }} />} />
        <Route path="/staff/login" element={<StaffLogin onLogin={(r) => {
          setLoggedIn(true);
          setRole(r);
        }} />} />
        <Route path="/dashboard" element={loggedIn ? getDashboard() : <Navigate to="/" />} />
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>404 - Page not found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;

