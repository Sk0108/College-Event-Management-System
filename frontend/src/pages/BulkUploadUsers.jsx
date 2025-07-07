// src/components/BulkUploadUsers.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function BulkUploadUsers() {
  const [file, setFile] = useState(null);

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return toast.error("Please select a CSV file");

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/users/bulk_upload/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success("Users uploaded successfully");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <Form onSubmit={handleUpload} className="glass-card">
      <Form.Control type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} className="mb-2" />
      <Button type="submit" className="w-100">Upload CSV</Button>
    </Form>
  );
}
