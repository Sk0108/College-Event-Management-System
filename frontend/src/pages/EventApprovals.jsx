// src/pages/EventApprovals.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Button, Card, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EventApprovals() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingEvents = async () => {
    try {
      const res = await api.get('events/pending/');
      setPendingEvents(res.data);
    } catch (err) {
      toast.error("Failed to fetch pending events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const handleApprove = async (eventId) => {
    try {
      await api.patch(`events/${eventId}/approve/`, { is_approved: true });
      toast.success('Event approved!');
      fetchPendingEvents();  //  Refresh after approval
    } catch (err) {
      toast.error("Approval failed.");
    }
  };

  const handleReject = async (eventId) => {
  try {
    await api.patch(`events/${eventId}/approve/`, { is_approved: false });
    toast.success('Event rejected');
    fetchPendingEvents();
  } catch (err) {
    toast.error('Failed to reject event');
  }
};


  return (
    <div>
      <h4 className="mb-3"> Pending Events</h4>

      {loading ? (
        <Spinner animation="border" />
      ) : pendingEvents.length === 0 ? (
        <p className="text-muted">No pending events.</p>
      ) : (
        pendingEvents.map(event => (
          <Card key={event.id} className="mb-3 bg-secondary text-white">
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Text><strong>Date:</strong> {new Date(event.date).toLocaleString()}</Card.Text>
              <Card.Text>{event.description}</Card.Text>
              <Button variant="success" onClick={() => handleApprove(event.id)}>
                 Approve
              </Button>
              <Button
                variant="danger"
                onClick={() => handleReject(event.id)}
                className="ms-2"
              >
                Reject
              </Button>

            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

