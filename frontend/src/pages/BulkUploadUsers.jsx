import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function BulkUploadUsers() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);  // 'file' must match the name used in views.py

    try {
      const token = localStorage.getItem('access');
      await axios.post('http://127.0.0.1:8000/api/bulk-upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success(" Users uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(" Upload failed. Check console.");
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h5>Bulk Upload Users (CSV)</h5>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} style={{ marginTop: '10px' }}>Upload</button>
    </div>
  );
}
