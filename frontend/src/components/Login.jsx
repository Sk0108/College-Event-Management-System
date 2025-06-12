
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Login.css';
import { toast } from 'react-toastify';

/*
 * Login Component
 * Handles user login, token management, and redirects based on user role.
 * Displays a background animation and a login form.
 */ 
export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const safeToast = (message) => {
    setTimeout(() => {
      toast.success(message, {
        autoClose: 3000,
        pauseOnHover: true,
        closeOnClick: true,
      });
    }, 0);
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/token/', {
      username,
      password
    });

    const { access, refresh } = res.data;
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);

    const decoded = jwtDecode(access);
    localStorage.setItem('username', decoded.username);
    const role = decoded.role;
    localStorage.setItem('role', role);

    onLogin(role);  // ✅ updates App.js state

    // 🔥 Add correct navigation based on role
    if (role === 'admin') navigate('/admin/dashboard');
    else navigate('/dashboard');

    toast.success(`Welcome back, ${username}!`);
  } catch (err) {
    setError('Invalid username or password');
  }
};

  return (
    <div className="login-container">
      <div className="background-animation"></div>
      <form className="login-card" onSubmit={handleLogin}>
        <h2> Event Portal Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}
