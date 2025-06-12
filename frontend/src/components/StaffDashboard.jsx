// src/pages/StaffDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../styles.css';

export default function StaffDashboard({ onLogout }) {
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [registrationLimit, setRegistrationLimit] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('Tech');

  const token = localStorage.getItem('access');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/approved/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setApprovedEvents(res.data))
    .catch(err => console.error('Approved fetch failed:', err));
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
        toast.success('Event created!');
        setTitle('');
        setDescription('');
        setDate('');
        setRegistrationLimit('');
        setCategory('Tech');
        setImage(null);
        setShowForm(false);
      })
      .catch(err => {
        console.error('Event creation error:', err);
        toast.error('Failed to create event.');
      });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📅 Staff Dashboard</h2>
        <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
      </div>

      <Button variant="info" className="mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Create New Event'}
      </Button>

      {showForm && (
        <div className="glass-card">
          <Form onSubmit={handleCreateEvent} encType="multipart/form-data">
            <Form.Control placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <Form.Control as="textarea" rows={3} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
            <Form.Control type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
            <Form.Control type="number" placeholder="Registration Limit" value={registrationLimit} onChange={e => setRegistrationLimit(e.target.value)} required />
            <Form.Select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="Tech">Tech</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
            </Form.Select>
            <Form.Control type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} />
            <Button type="submit" className="mt-2">Create</Button>
          </Form>
        </div>
      )}

      <div className="glass-card mt-4">
        <h5>Approved Events</h5>
        <Table bordered hover responsive className="styled-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Limit</th>
              <th>Registrations</th>
            </tr>
          </thead>
          <tbody>
            {approvedEvents.map(event => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{new Date(event.date).toLocaleString()}</td>
                <td>{event.registration_limit}</td>
                <td>{event.registrations_count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
