import React from 'react';
import { Table } from 'react-bootstrap';

export default function ParticipantsTable({ registrations }) {
  return (
    <div style={{ marginTop: '30px' }}>
      <h5 style={{ color: 'white' }}> Registered Students</h5>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Reg. No</th>
            <th>Email</th>
            <th>Dept</th>
            <th>Approved?</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map(r => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.registration_number}</td>
              <td>{r.email}</td>
              <td>{r.department}</td>
              <td>{r.is_approved ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
