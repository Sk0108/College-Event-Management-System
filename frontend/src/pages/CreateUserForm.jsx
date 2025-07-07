// src/components/CreateUserForm.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function CreateUserForm() {
  const [form, setForm] = useState({ name: '', email: '', role: 'student', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/users/', form);
      toast.success('User created successfully');
      setForm({ name: '', email: '', role: 'student', password: '' });
    } catch (err) {
      toast.error('Failed to create user');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="glass-card">
      <Form.Control name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="mb-2" />
      <Form.Control name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="mb-2" />
      <Form.Control type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="mb-2" />
      <Form.Select name="role" value={form.role} onChange={handleChange} className="mb-2">
        <option value="student">Student</option>
        <option value="staff">Staff</option>
        <option value="admin">Admin</option>
      </Form.Select>
      <Button type="submit" className="w-100">Create User</Button>
    </Form>
  );
}

