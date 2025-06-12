import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import api from '../services/api';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ParticipantsTable from './ParticipantsTable';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function EventAnalytics() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    api.get('events/')
      .then(res => setAnalyticsData(res.data))
      .catch(err => console.error("Failed to fetch analytics data", err));
  }, []);

  const fetchParticipants = async (eventId) => {
    setSelectedEvent(eventId);
    try {
      const res = await api.get(`events/${eventId}/registrations/`);
      setRegistrations(res.data);
      setSelectedRows([]);
    } catch (err) {
      console.error('Participant fetch error:', err);
    }
  };

  const toggleRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const bulkAction = async (action) => {
    if (!selectedEvent || selectedRows.length === 0) return;
    try {
      const url = `events/${selectedEvent}/${action}/`;
      const res = await api.post(url, { ids: selectedRows });
      alert(`${res.data.updated_count} registrations ${action.replace('_', ' ')}!`);
      fetchParticipants(selectedEvent); // refresh
    } catch (err) {
      alert('Bulk action failed.');
    }
  };

  const data = {
    labels: analyticsData.map(event => event.title),
    datasets: [
      {
        label: 'Participants',
        data: analyticsData.map(event => event.registrations_count || 0),
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#f67019'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ background: '#1d1e2c', padding: '20px', color: 'white' }}>
      <h3 className="text-center"> Participant Analytics</h3>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Pie
          data={data}
          options={{
            onClick: (e, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index;
                const eventId = analyticsData[index].id;
                fetchParticipants(eventId);
              }
            }
          }}
        />
      </div>

      {registrations.length > 0 && (
        <>
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button onClick={() => bulkAction('bulk_approve')} className="btn btn-success"> Approve Selected</button>
            <button onClick={() => bulkAction('bulk_reject')} className="btn btn-danger"> Reject Selected</button>
          </div>

          <table className="table table-dark mt-3">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Reg No</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map(r => (
                <tr key={r.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(r.id)}
                      onChange={() => toggleRow(r.id)}
                    />
                  </td>
                  <td>{r.name}</td>
                  <td>{r.registration_number}</td>
                  <td>{r.email}</td>
                  <td>{r.department}</td>
                  <td>{r.is_approved ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
