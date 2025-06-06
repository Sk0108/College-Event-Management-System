import React, { useState } from 'react';
import axios from 'axios';

export default function EventRegisterForm({ eventId, onClose }) {
  const [form, setForm] = useState({
    name: '',
    registration_number: '',
    department: '',
    email: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/events/${eventId}/custom_register/`,
        {
          ...form,
          event: eventId // ✅ Include the event ID explicitly
        }
      );
      setSuccess("✅ Your registration is being confirmed and you will get an email soon.");
      setForm({ name: '', registration_number: '', department: '', email: '' });

      // Auto-close form after a few seconds (optional)
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      const data = err.response?.data;
      console.error("Registration error:", data);

      let detailedError = 'Registration failed.';
      if (typeof data === 'object') {
        detailedError = Object.entries(data)
          .map(([key, val]) => `${key}: ${val}`)
          .join('\n');
      }
      setError(detailedError);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '20px' }}>
      <h3>📝 Event Registration</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required /><br /><br />
        <input type="text" name="registration_number" placeholder="Registration Number" value={form.registration_number} onChange={handleChange} required /><br /><br />
        <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} required /><br /><br />
        <input type="email" name="email" placeholder="Email ID" value={form.email} onChange={handleChange} required /><br /><br />
        <button type="submit">Submit</button>
      </form>

      {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}
