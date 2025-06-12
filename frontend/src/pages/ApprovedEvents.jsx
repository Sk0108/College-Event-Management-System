// src/pages/ApprovedEvents.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function ApprovedEvents() {
  const [approved, setApproved] = useState([]);

  useEffect(() => {
    api.get('events/?is_approved=true')
      .then(res => setApproved(res.data))
      .catch(err => console.error("Failed to fetch approved events", err));
  }, []);

  return (
    <div>
      <h3>Approved Events</h3>
      {approved.length === 0 ? (
        <p>No approved events yet.</p>
      ) : (
        <ul>
          {approved.map(e => (
            <li key={e.id}>{e.title} — {new Date(e.date).toLocaleDateString()}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
