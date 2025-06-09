import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

/** * RegisterForm Component
 * Handles event registration for users.
 * Collects user details and submits them to the backend API.
 */
export default function RegisterForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');

  const token = localStorage.getItem('access');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://127.0.0.1:8000/api/events/${eventId}/custom_register/`, {
        name,
        registration_number: registrationNumber,
        department,
        email
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('🎉 Registered successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed!');
    }
  };
/* * Render the registration form
    * Displays input fields for user details and handles form submission.
    * Uses local state to manage form inputs.
    */
  return (
    <div style={{ padding: '2rem' }}>
      <h2> Event Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required /><br />
        <input type="text" placeholder="Registration Number" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} required /><br />
        <input type="text" placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} required /><br />
        <input type="email" placeholder="Email ID" value={email} onChange={e => setEmail(e.target.value)} required /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
