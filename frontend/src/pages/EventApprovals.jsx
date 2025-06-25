// src/pages/EventApprovals.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function EventApprovals() {
  const [pendingEvents, setPendingEvents] = useState([]);
  const [rejectionReasons, setRejectionReasons] = useState({});
  const token = localStorage.getItem('access');

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = () => {
    axios.get('http://127.0.0.1:8000/api/events/pending/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setPendingEvents(res.data))
      .catch(err => toast.error('❌ Could not load events'));
  };

  const approveEvent = (id) => {
    axios.patch(`http://127.0.0.1:8000/api/events/${id}/approve/`, {
      is_approved: true
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.success('✅ Event approved');
        fetchPending();
      })
      .catch(() => toast.error('❌ Approval failed'));
  };

  const rejectEvent = (id) => {
    const reason = rejectionReasons[id];
    if (!reason) {
      toast.error('Please provide a rejection reason');
      return;
    }

    axios.patch(`http://127.0.0.1:8000/api/events/${id}/approve/`, {
      is_approved: false,
      rejection_reason: reason
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        toast.info('❌ Event rejected');
        fetchPending();
      })
      .catch(() => toast.error('❌ Rejection failed'));
  };

  const handleReasonChange = (id, value) => {
    setRejectionReasons(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div>
      <h4 className="mb-3"> Pending Event Approvals</h4>
      {pendingEvents.length === 0 ? (
        <p>No events awaiting approval.</p>
      ) : (
        pendingEvents.map(event => (
          <Card key={event.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{new Date(event.date).toLocaleString()}</Card.Subtitle>
              <Card.Text>{event.description}</Card.Text>
              <div className="d-flex gap-3">
                <Button variant="success" onClick={() => approveEvent(event.id)}>Approve</Button>
                <Form.Control
                  placeholder="Reason for rejection"
                  value={rejectionReasons[event.id] || ''}
                  onChange={(e) => handleReasonChange(event.id, e.target.value)}
                  style={{ maxWidth: 250 }}
                />
                <Button variant="danger" onClick={() => rejectEvent(event.id)}>Reject</Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}
