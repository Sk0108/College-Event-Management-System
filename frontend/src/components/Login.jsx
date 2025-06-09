import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Login.css';
import { toast } from 'react-toastify';

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
      const role = decoded.role;
      localStorage.setItem('role', role);

      safeToast(` Welcome back, ${username}!`);
      onLogin(role);

      if (role === 'student' || role === 'staff') {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
      toast.error(' Login failed. Please try again.', {
        autoClose: 3000,
        pauseOnHover: true,
      });
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
