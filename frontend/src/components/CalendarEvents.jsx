// src/components/CalendarEvents.jsx
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './CalendarEvents.css';

export default function CalendarEvents() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/approved/')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Calendar fetch error:', err));
  }, []);

  const getTileContent = ({ date }) => {
    const hasEvent = events.find(e =>
      new Date(e.date).toDateString() === date.toDateString()
    );
    return hasEvent ? <div className="dot" /> : null;
  };

  const eventsForSelectedDate = events.filter(
    e => new Date(e.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="glass-card calendar-container">
      <h5 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Event Calendar</h5>
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={getTileContent}
      />
      <ul className="mt-3">
        {eventsForSelectedDate.length === 0 ? (
          <li>No events on this day</li>
        ) : (
          eventsForSelectedDate.map(event => (
            <li key={event.id}>{event.title}</li>
          ))
        )}
      </ul>
    </div>
  );
}
