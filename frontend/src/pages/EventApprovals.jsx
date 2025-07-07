// src/components/EventApprovals.jsx
import React, { useEffect, useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function EventApprovals() {
  const [events, setEvents] = useState([]);
  const [reasons, setReasons] = useState({});

  useEffect(() => {
    api.get('/events/pending/').then(res => setEvents(res.data));
  }, []);

  const handleAction = (id, isApproved) => {
    const payload = { is_approved: isApproved };
    if (!isApproved) payload.rejection_reason = reasons[id] || '';
    api.patch(`/events/${id}/approve/`, payload)
      .then(() => {
        toast.success(`Event ${isApproved ? 'approved' : 'rejected'}`);
        setEvents(events.filter(e => e.id !== id));
      })
      .catch(() => toast.error("Action failed"));
  };

  return (
    <div className="glass-card">
      <h5>Pending Event Approvals</h5>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Staff</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.map(e => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.created_by_name}</td>
              <td>{e.category}</td>
              <td>{new Date(e.date).toLocaleString()}</td>
              <td>
                <Button variant="success" size="sm" onClick={() => handleAction(e.id, true)}>Approve</Button>{' '}
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Rejection Reason"
                  value={reasons[e.id] || ''}
                  onChange={e2 => setReasons({ ...reasons, [e.id]: e2.target.value })}
                  className="my-1"
                />
                <Button variant="danger" size="sm" onClick={() => handleAction(e.id, false)}>Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
