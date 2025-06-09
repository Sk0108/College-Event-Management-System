import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import StaffDashboard from './components/StaffDashboard';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Main App Component
// This component manages the application state, handles user authentication, and routes to different dashboards based on user roles.
// It uses React Router for navigation and Toastify for notifications.
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    const userRole = localStorage.getItem('role');
    setLoggedIn(!!token);
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setRole(null);
  };

  const onLogin = (userRole) => {
    setLoggedIn(true);
    setRole(userRole);

    // Redirect based on role immediately after login
    if (userRole === 'admin') {
      window.location.href = 'http://127.0.0.1:8000/admin/logout/?next=http://localhost:3000/';
    }
  };
// Function to get the appropriate dashboard based on user role
  // Returns the StaffDashboard for staff users, StudentDashboard for students, or redirects to home for other roles.
  // This function is used in the routing logic to determine which dashboard to display.
  // It checks the user's role and returns the corresponding dashboard component.
  // If the user is not logged in or has an invalid role, it redirects to the home page.
  const getDashboard = () => {
    if (role === 'staff') return <StaffDashboard onLogout={handleLogout} />;
    if (role === 'student') return <StudentDashboard onLogout={handleLogout} />;
    return <Navigate to="/" />;
  };

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
        <Route path="/dashboard" element={loggedIn ? getDashboard() : <Navigate to="/" />} />
        <Route path="*" element={<h2 style={{ padding: '2rem' }}>404 - Page not found</h2>} />
      </Routes>
      
      <ToastContainer />
    </Router>
    
  );
}

export default App;


