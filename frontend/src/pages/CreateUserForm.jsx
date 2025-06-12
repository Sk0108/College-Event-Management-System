// src/pages/CreateUserForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateUserForm() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'student' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/register/', form);
      toast.success(' User created!');
      setForm({ username: '', email: '', password: '', role: 'student' });
    } catch (err) {
      toast.error(' Failed to create user');
    }
  };

  return (
    <div>
      <h3>Create Student/Staff</h3>
      <form onSubmit={handleSubmit}>
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" required /><br />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required /><br />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required /><br />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
