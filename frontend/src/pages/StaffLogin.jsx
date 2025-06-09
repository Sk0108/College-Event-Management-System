
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

/** * StaffLogin Component
 * Handles staff login functionality, including form submission and token management.
 * Redirects to the dashboard upon successful login.
 */
export default function StaffLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('token/', { username, password });
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      const userInfo = await api.get('me/');
      const role = userInfo.data.role;

      localStorage.setItem('role', role);
      onLogin(role);
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

    // Render the staff login form
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Staff Login</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br /><br />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
