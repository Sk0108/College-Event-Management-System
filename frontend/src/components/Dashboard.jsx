// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import api from '../services/api';

export default function Dashboard({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  useEffect(() => {
    // Fetch approved events
    api.get('events/')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Event fetch error:", err));

    // Fetch registered events
    api.get('events/registered/')
      .then(res => setRegistered(res.data.map(e => e.id)))
      .catch(err => console.error("Registered fetch error:", err));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await api.post(`events/${eventId}/register/`);
      setRegistered(prev => [...prev, eventId]);
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed.');
    }
  };

  const handleUnregister = async (eventId) => {
    try {
      await api.post(`events/${eventId}/unregister/`);
      setRegistered(prev => prev.filter(id => id !== eventId));
    } catch (err) {
      alert(err.response?.data?.error || 'Unregistration failed.');
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

  return (
    <>
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🎓 Student Dashboard</h2>
          <Button variant="secondary" onClick={onLogout}>
            Logout
          </Button>
        </div>

        {events.length === 0 ? (
          <p className="text-muted">No events available at the moment.</p>
        ) : (
          <>
            <h4 className="mb-3">🗓 Approved Events</h4>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {events.map(event => {
                // Determine full image URL
                const imageUrl = event.image
                  ? (event.image.startsWith('http')
                      ? event.image
                      : `http://127.0.0.1:8000${event.image}`)
                  : '';

                return (
                  <Col key={event.id}>
                    <Card className="h-100 shadow-sm">
                      {imageUrl ? (
                        <Card.Img
                          variant="top"
                          src={imageUrl}
                          alt="Event poster"
                          style={{ cursor: 'pointer', objectFit: 'cover', height: '180px' }}
                          onClick={() => openModal(imageUrl)}
                        />
                      ) : (
                        <div
                          className="bg-light d-flex justify-content-center align-items-center"
                          style={{ height: '180px', borderTopLeftRadius: '0.25rem', borderTopRightRadius: '0.25rem' }}
                        >
                          <span className="text-muted">No Image</span>
                        </div>
                      )}

                      <Card.Body className="d-flex flex-column">
                        <Card.Title>{event.title}</Card.Title>
                        <Card.Text className="mb-1">
                          <strong>Date:</strong> {new Date(event.date).toLocaleString()}
                        </Card.Text>
                        <Card.Text className="flex-grow-1 text-truncate">
                          {event.description}
                        </Card.Text>

                        {registered.includes(event.id) ? (
                          <div className="mt-auto d-flex justify-content-between align-items-center">
                            <span className="text-success">✅ Registered</span>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleUnregister(event.id)}
                            >
                              Unregister
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleRegister(event.id)}
                            className="mt-auto"
                          >
                            Register
                          </Button>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Container>

      {/* Modal for Expanding an Event Poster */}
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
