import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function ApprovedEvents() {
  const [approvedEvents, setApprovedEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    axios.get('http://127.0.0.1:8000/api/events/approved/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setApprovedEvents(res.data))
    .catch(err => {
      console.error('Failed to fetch approved events:', err);
      toast.error('Error fetching approved events');
    });
  }, []);

  return (
    <div className="glass-card">
      <h5>Approved Events</h5>
      {approvedEvents.length === 0 ? (
        <p className="text-muted">No approved events yet.</p>
      ) : (
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
                <td>{event.registrations_count || 0}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
