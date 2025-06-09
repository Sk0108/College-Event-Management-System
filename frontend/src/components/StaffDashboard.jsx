import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

/* * StaffDashboard Component
 * Allows staff to create events and view pending events for approval.
 * Displays a form for event creation and lists pending events.
 */
export default function StaffDashboard({ onLogout }) {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [registrationLimit, setRegistrationLimit] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('Tech');
  const token = localStorage.getItem('access');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/pending/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setPendingEvents(res.data))
    .catch(err => console.error(' Fetch failed:', err));
  }, [token]);

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('registration_limit', registrationLimit);
    formData.append('category', category);
    if (image) formData.append('image', image);

    axios.post('http://127.0.0.1:8000/api/events/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      toast.success(' Event created! Awaiting admin approval.');
      setTitle('');
      setDescription('');
      setDate('');
      setRegistrationLimit('');
      setCategory('Tech');
      setImage(null);
    })
    .catch(err => {
      console.error(' Event creation error:', err);
      toast.error(' Failed to create event. Please try again.');
    });
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: '0 auto', color: 'white' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}> Staff Dashboard</h2>
      <button onClick={onLogout} style={{
        marginBottom: '20px',
        padding: '8px 16px',
        backgroundColor: '#ff4d4f',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer'
      }}>Logout</button>

      <form onSubmit={handleCreateEvent} encType="multipart/form-data" style={{
        backgroundColor: '#1f2e3a',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '40px'
      }}>
        <h3 style={{ marginBottom: '15px' }}> Create New Event</h3>

        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required style={inputStyle} />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required style={inputStyle} />
        <input type="number" placeholder="Registration Limit" value={registrationLimit} onChange={e => setRegistrationLimit(e.target.value)} required style={inputStyle} />
        
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ ...inputStyle, backgroundColor: '#2e3b4e', color: 'white' }}>
          <option value="Tech">Tech</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
        </select>

        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{ ...inputStyle, color: 'white' }} />
        <button type="submit" style={submitStyle}>Create Event</button>
      </form>

      <h3 style={{ marginBottom: '10px' }}> Pending Events</h3>
      {pendingEvents.length === 0 ? (
        <p style={{ color: '#ccc' }}>No events pending approval.</p>
      ) : (
        <ul style={{ listStyleType: 'circle', paddingLeft: '20px', color: 'white' }}>
          {pendingEvents.map(event => (
            <li key={event.id} style={{ marginBottom: '6px' }}>{event.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  marginBottom: '15px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#2e3b4e',
  color: 'white',
};

const submitStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '10px'
};
