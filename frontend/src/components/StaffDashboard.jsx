import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    .catch(err => console.error('❌ Fetch failed:', err));
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
      alert('✅ Event created! Awaiting admin approval.');
      setTitle('');
      setDescription('');
      setDate('');
      setRegistrationLimit('');
      setCategory('Tech');
      setImage(null);
    })
    .catch(err => {
      console.error('❌ Event creation error:', err);
      alert('Failed to create event');
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📋 Staff Dashboard</h2>
      <button onClick={onLogout}>Logout</button>

      <form onSubmit={handleCreateEvent} encType="multipart/form-data" style={{ marginTop: '20px' }}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required /><br />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required /><br />
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required /><br />
        <input type="number" placeholder="Limit" value={registrationLimit} onChange={e => setRegistrationLimit(e.target.value)} required /><br />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Tech">Tech</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
        </select><br />
        <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} /><br />
        <button type="submit">Create Event</button>
      </form>

      <h3 style={{ marginTop: '30px' }}>⏳ Pending Events</h3>
      {pendingEvents.length === 0 ? (
        <p>No events pending approval.</p>
      ) : (
        <ul>
          {pendingEvents.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
