import React, { useState } from 'react';
import api from '../services/api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('token/', { username, password });
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      onLogin();
    } catch {
      alert('Invalid credentials.');
    }
  };

  return (
    <div style={{
      height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      background: 'linear-gradient(135deg, #e0eafc, #cfdef3)', fontFamily: 'Arial'
    }}>
      <form onSubmit={handleSubmit} style={{
        padding: '30px', borderRadius: '10px', backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)', minWidth: '300px'
      }}>
        <h2 style={{ textAlign: 'center' }}>🎓 Student Login</h2>
        <input type="text" placeholder="Username" required value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', margin: '10px 0', padding: '8px' }} />
        <input type="password" placeholder="Password" required value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', margin: '10px 0', padding: '8px' }} />
        <button type="submit" style={{
          width: '100%', padding: '10px', backgroundColor: '#007bff',
          color: 'white', border: 'none', borderRadius: '5px'
        }}>
          Login
        </button>
      </form>
    </div>
  );
}
