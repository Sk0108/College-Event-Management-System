import React from 'react';

export default function AdminDashboard({ onLogout }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>🛠 Admin Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
      {/* Add approval panel */}
    </div>
  );
}
