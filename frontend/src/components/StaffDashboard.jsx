import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../styles.css';

export default function StaffDashboard({ onLogout }) {
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [rejectedEvents, setRejectedEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('approved');
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

    axios.get('http://127.0.0.1:8000/api/events/rejected/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setRejectedEvents(res.data))
      .catch(err => console.error('Rejected fetch failed:', err));
  }, [token, showForm]);

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
    <div>
      <div
        className="dashboard-header d-flex justify-content-between align-items-center mb-4"
        style={{ marginTop: '2.5rem' }}
      >
        <Button
          variant="outline-danger"
          onClick={onLogout}
          className="mt-3 me-4"
          style={{ position: "absolute", right: 0, top: 0, zIndex: 10 }}
        >
          Logout
        </Button>
        <h2
          className="text-white"
          style={{
            fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
            letterSpacing: '2px',
            fontWeight: 700,
            fontSize: '2.5rem',
            textShadow: '2px 2px 8px #222, 0 0 10px #00e6e6',
            textAlign: 'center',
            width: '100%',
            marginBottom: '1rem'
          }}
        >
          Staff Dashboard
        </h2>
        <div style={{ width: 120 }} />
      </div>

      {/* Staff Panel Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#B0E0E6', borderRadius: 8 }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ fontWeight: 600, color: '#007bff', fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif" }}>
            Staff Panel
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#staffNavbar" aria-controls="staffNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="staffNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className={`nav-link${showForm ? ' active' : ''}`}
                  href="#"
                  style={{ color: 'black' }}
                  onClick={e => { e.preventDefault(); setShowForm(true); setActiveTab(''); }}
                >
                  Create New Event
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link${activeTab === 'approved' && !showForm ? ' active' : ''}`}
                  href="#"
                  style={{ color: 'black' }}
                  onClick={e => { e.preventDefault(); setShowForm(false); setActiveTab('approved'); }}
                >
                  View Approved Events
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link${activeTab === 'rejected' && !showForm ? ' active' : ''}`}
                  href="#"
                  style={{ color: 'black' }}
                  onClick={e => { e.preventDefault(); setShowForm(false); setActiveTab('rejected'); }}
                >
                  View Rejected Events
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="mt-4">
        {showForm ? (
  <div className="glass-card" style={{ maxWidth: 500, margin: "0 auto", padding: "2rem 1.5rem" }}>
    <Form onSubmit={handleCreateEvent} encType="multipart/form-data">
      <Form.Control
        size="sm"
        className="mb-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <Form.Control
        as="textarea"
        rows={2}
        size="sm"
        className="mb-2"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      <Form.Control
        type="datetime-local"
        size="sm"
        className="mb-2"
        value={date}
        onChange={e => setDate(e.target.value)}
        required
      />
      <Form.Control
        type="number"
        size="sm"
        className="mb-2"
        placeholder="Registration Limit"
        value={registrationLimit}
        onChange={e => setRegistrationLimit(e.target.value)}
        required
      />
      <Form.Select
        size="sm"
        className="mb-2"
        value={category}
        onChange={e => setCategory(e.target.value)}
      >
        <option value="Tech">Tech</option>
        <option value="Cultural">Cultural</option>
        <option value="Sports">Sports</option>
      </Form.Select>
      <Form.Control
        type="file"
        size="sm"
        className="mb-2"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
      />
      <Button type="submit" className="mt-2" size="sm" style={{ width: "100%" }}>
        Create
      </Button>
    </Form>
  </div>
) : activeTab === 'approved' ? (
          <div className="glass-card">
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
        ) : activeTab === 'rejected' ? (
          <div className="glass-card">
            <h5>Rejected Events</h5>
            <Table bordered hover responsive className="styled-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Limit</th>
                  <th>Registrations</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                {rejectedEvents.map(event => (
                  <tr key={event.id}>
                    <td>{event.title}</td>
                    <td>{event.category}</td>
                    <td>{new Date(event.date).toLocaleString()}</td>
                    <td>{event.registration_limit}</td>
                    <td>{event.registrations_count}</td>
                    <td>{event.rejection_reason || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="glass-card">
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
        )}
      </div>
    </div>
  );
}