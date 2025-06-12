import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import api from '../services/api';
import EventRegisterForm from './EventRegisterForm';
import { toast } from 'react-toastify';
import Chatbot from './Chatbot';

export default function StudentDashboard({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showFormEventId, setShowFormEventId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  useEffect(() => {
    api.get('events/')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Event fetch error:", err));

    api.get('events/registered/')
      .then(res => setRegistered(res.data.map(e => e.id)))
      .catch(err => console.error("Registered fetch error:", err));

    api.get('events/upcoming/')
      .then(res => setUpcoming(res.data.map(e => e.id)))
      .catch(err => console.error("Upcoming fetch error:", err));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await api.post(`events/${eventId}/register/`);
      setRegistered(prev => [...prev, eventId]);
      toast.success('Registered successfully! Await admin approval.');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed.');
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      await api.post(`events/${eventId}/unregister/`);
      setRegistered(prev => prev.filter(id => id !== eventId));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Unregistration failed.');
    }
  };

  const openModal = (imageUrl) => {
    setModalImage(imageUrl.startsWith('http') ? imageUrl : `http://127.0.0.1:8000${imageUrl}`);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const toggleDescription = (eventId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const filteredEvents = events
    .filter(e => filter === 'All' || e.category === filter)
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
      return new Date(a.date) - new Date(b.date);
    });

  return (
    <>
      <Container className="student-dashboard py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-white">Student Dashboard</h2>
          <Button variant="secondary" onClick={onLogout}>Logout</Button>
        </div>

        {/* Filters */}
        <div className="mb-3 d-flex gap-3 align-items-center">
          <Form.Select value={filter} onChange={e => setFilter(e.target.value)} style={{ width: '150px' }}>
            <option value="All">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Cultural">Cultural</option>
            <option value="Sports">Sports</option>
          </Form.Select>
          <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: '150px' }}>
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest</option>
          </Form.Select>
        </div>

        <h4 className="mb-3 text-white">Approved Events</h4>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {filteredEvents.map(event => {
            const imageUrl = event.image
              ? (event.image.startsWith('http') ? event.image : `http://127.0.0.1:8000${event.image}`)
              : '';

            const isExpanded = expandedDescriptions[event.id];
            const description = isExpanded
              ? event.description
              : event.description.length > 100
                ? `${event.description.slice(0, 100)}...`
                : event.description;

            return (
              <Col key={event.id}>
                <Card className="h-100 shadow-sm event-card">
                  {imageUrl ? (
                    <Card.Img
                      variant="top"
                      src={imageUrl}
                      alt="Event poster"
                      className="event-image"
                      onClick={() => openModal(imageUrl)}
                    />
                  ) : (
                    <div className="no-image">
                      <span className="text-white">No Image</span>
                    </div>
                  )}

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-primary">{event.title}</Card.Title>
                    <Card.Text className="mb-1">
                      <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                    </Card.Text>
                    <Card.Text className="flex-grow-1">
                      {description}
                      {event.description.length > 100 && (
                        <span
                          className="toggle-link"
                          onClick={() => toggleDescription(event.id)}
                        >
                          {isExpanded ? ' Show Less' : ' Show More'}
                        </span>
                      )}
                    </Card.Text>

                    {registered.includes(event.id) ? (
                      <>
                        <span style={{ color: 'limegreen' }}>✅ Registered</span>
                        <Button size="sm" variant="outline-danger" className="mt-2" onClick={() => handleUnregister(event.id)}>Unregister</Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" variant="primary" onClick={() => setShowFormEventId(event.id)}>Register</Button>
                        {showFormEventId === event.id && (
                          <EventRegisterForm
                            eventId={event.id}
                            onClose={() => setShowFormEventId(null)}
                          />
                        )}
                      </>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Upcoming Events */}
        <h4 className="mt-5 text-white">Your Upcoming Events</h4>
        {events.filter(e => upcoming.includes(e.id)).length === 0 ? (
          <p className="text-muted">No upcoming approved events.</p>
        ) : (
          <ul className="text-white">
            {events.filter(e => upcoming.includes(e.id)).map(e => (
              <li key={e.id}>
                {e.title} — {new Date(e.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </Container>

      {/* Chatbot fixed at bottom-right */}
      <Chatbot />

      {/* Modal for Poster */}
      <Modal show={showModal} onHide={closeModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Event Poster</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {modalImage && (
            <img
              src={modalImage}
              alt="Enlarged poster"
              style={{ maxWidth: '100%', maxHeight: '80vh' }}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
