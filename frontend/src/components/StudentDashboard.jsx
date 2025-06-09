import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import api from '../services/api';
import EventRegisterForm from './EventRegisterForm';
import { toast } from 'react-toastify';

/* * StudentDashboard Component
 * Displays a list of approved events for students to register or unregister.
  * Allows students to view event details, register, and unregister.
  * Handles image display in a modal.
  * Manages event registration state and description toggling.
 */
export default function StudentDashboard({ onLogout }) {
  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [showFormEventId, setShowFormEventId] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    api.get('events/')
      .then(res => setEvents(res.data))
      .catch(err => console.error("Event fetch error:", err));

    api.get('events/registered/')
      .then(res => setRegistered(res.data.map(e => e.id)))
      .catch(err => console.error("Registered fetch error:", err));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await api.post(`events/${eventId}/register/`);
      setRegistered(prev => [...prev, eventId]);
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

  return (
    <>
      <Container className="student-dashboard py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-white">Student Dashboard</h2>
          <Button variant="secondary" onClick={onLogout}>Logout</Button>
        </div>

        {events.length === 0 ? (
          <p className="text-muted">No events available at the moment.</p>
        ) : (
          <>
            <h4 className="mb-3 text-white">Approved Events</h4>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {events.map(event => {
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
                            <Button size="sm" variant="primary" onClick={() => setShowFormEventId(event.id)}>
                              Register
                            </Button>
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
          </>
        )}
      </Container>

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
