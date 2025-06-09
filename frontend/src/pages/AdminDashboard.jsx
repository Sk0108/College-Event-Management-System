import React from 'react';

/* * AdminDashboard.jsx
 * This component represents the admin dashboard where admins can manage event approvals.
 */
export default function AdminDashboard({ onLogout }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2> Admin Dashboard</h2>
      <button onClick={onLogout}>Logout</button>
      {/* Add approval panel */}
    </div>
  );
}
