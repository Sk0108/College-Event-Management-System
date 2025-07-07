import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventListCard.css';

export default function EventListCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/pending/')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Pending event fetch error:', err));
  }, []);

  return (
    <div className="glass-card">
      <h5>Pending Events</h5>
      <ul className="event-list">
        {events.length === 0 ? (
          <li>No pending events</li>
        ) : (
          events.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> — {new Date(event.date).toLocaleString()}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
