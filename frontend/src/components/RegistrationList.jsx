import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function RegistrationList({ eventId, onClose }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    api.get(`events/${eventId}/registrations/`)
      .then(res => setRegistrations(res.data))
      .catch(err => console.error('Fetch registrations failed:', err));
  }, [eventId]);

  return (
    <div style={{
      backgroundColor: '#1a1a1a',
      padding: '1rem',
      borderRadius: '10px',
      color: 'white',
      marginTop: '1rem'
    }}>
      <h4>👥 Registrations for Event #{eventId}</h4>
      <button onClick={onClose}>Close</button>
      {registrations.length === 0 ? (
        <p>No students have registered yet.</p>
      ) : (
        <ul>
          {registrations.map((r, idx) => (
            <li key={idx}>
              {r.name} - {r.email} ({r.registration_number}) [{r.department}]
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
