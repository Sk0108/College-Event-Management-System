import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('token/', { username, password });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      navigate('/dashboard');  // ✅ Go to React dashboard
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    }
  };
  const handleLogin = async () => {
    try {
      const res = await api.post('/token/', { username, password });

      // Save tokens
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      localStorage.setItem('role', res.data.role);
      //localStorage.setItem('role', decodedToken.role); 

      // Redirect based on role
      if (res.data.role === 'student') {
        navigate('/dashboard'); // student dashboard
      } else if (res.data.role === 'staff') {
        navigate('/staff/dashboard'); // optional if you have one
      } else {
        // For admin, redirect to Django admin
        window.location.href = 'http://127.0.0.1:8000/admin/';
      }
    } catch (err) {
      alert('Login failed: ' + (err.response?.data?.detail || 'Unknown error'));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label><br />
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} /><br />
        <label>Password:</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}