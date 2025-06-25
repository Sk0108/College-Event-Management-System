// src/pages/RejectedEvents.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function RejectedEvents() {
  const [rejected, setRejected] = useState([]);
  const token = localStorage.getItem('access');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/rejected/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setRejected(res.data))
      .catch(err => toast.error('❌ Failed to fetch rejected events'));
  }, [token]);

  return (
    <div>
      <h4 className="mb-3"> Rejected Events</h4>
      {rejected.length === 0 ? (
        <p>No rejected events yet.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Rejection Reason</th>
            </tr>
          </thead>
          <tbody>
            {rejected.map(event => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{event.category}</td>
                <td>{new Date(event.date).toLocaleString()}</td>
                <td>{event.rejection_reason || '—'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
