// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Container, Tab, Row, Col, Button } from 'react-bootstrap';
import CreateUserForm from './CreateUserForm';
import BulkUploadUsers from './BulkUploadUsers';
import EventApprovals from './EventApprovals';
import ApprovedEvents from './ApprovedEvents';
import RejectedEvents from './RejectedEvents';
import EventAnalytics from './EventAnalytics';

import DashboardStats from '../components/DashboardStats';
import GrowthAnalyticsChart from '../components/GrowthAnalyticsChart';
import CalendarEvents from '../components/CalendarEvents';
import EventListCard from '../components/EventListCard';
import api from '../services/api';

import '../pages/AdminDashboard.css'; // Or your main dashboard CSS

export default function AdminDashboard({ onLogout }) {
  const [activeKey, setActiveKey] = useState('dashboard');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Fetch dashboard stats
    api.get('/events/stats/')
      .then(res => setStats(res.data))
      .catch(err => console.error('Error fetching stats:', err));
  }, []);

  const tabs = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'create-user', label: 'Create User' },
    { key: 'upload-csv', label: 'Upload CSV' },
    { key: 'approve-events', label: 'Approve Events' },
    { key: 'approved-events', label: 'Approved Events' },
    { key: 'rejected-events', label: 'Rejected Events' },
    { key: 'analytics', label: 'Analytics' },
  ];

  return (
    <div className="dashboard-container">
      {/* Admin Header */}
      <div className="d-flex justify-content-between align-items-center" style={{ padding: '2rem 2rem 1rem 2rem' }}>
        <h2 className="text-white"
          style={{
            fontFamily: "'Orbitron', 'Segoe UI', Arial",
            fontWeight: 700,
            fontSize: '2.5rem',
            textShadow: '2px 2px 8px #222, 0 0 10px #00e6e6',
            width: '100%',
          }}>
          Admin Dashboard
        </h2>
        <Button
          variant="outline-danger"
          onClick={onLogout}
          className="ms-3"
          style={{ position: 'absolute', right: 32, top: 24, padding: '2px 16px', fontSize: '1rem' }}
        >
          Logout
        </Button>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: '#B0E0E6', borderBottom: '1px solid #333' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{ fontWeight: 600, color: 'purple' }}>
            Admin Panel
          </a>
          <ul className="navbar-nav">
            {tabs.map(tab => (
              <li className="nav-item" key={tab.key}>
                <a
                  className={`nav-link${activeKey === tab.key ? ' active' : ''}`}
                  href="#"
                  onClick={() => setActiveKey(tab.key)}
                  style={{ color: 'black' }}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Tabbed Content */}
      <Container fluid>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="dashboard">
                  {stats ? (
                    <>
                      <DashboardStats stats={stats} />
                      <GrowthAnalyticsChart />
                      <CalendarEvents />
                      <EventListCard />
                    </>
                  ) : (
                    <p style={{ padding: '1rem' }}>Loading dashboard...</p>
                  )}
                </Tab.Pane>

                <Tab.Pane eventKey="create-user">
                  <CreateUserForm />
                </Tab.Pane>

                <Tab.Pane eventKey="upload-csv">
                  <BulkUploadUsers />
                </Tab.Pane>

                <Tab.Pane eventKey="approve-events">
                  <EventApprovals />
                </Tab.Pane>

                <Tab.Pane eventKey="approved-events">
                  <ApprovedEvents />
                </Tab.Pane>

                <Tab.Pane eventKey="rejected-events">
                  <RejectedEvents />
                </Tab.Pane>

                <Tab.Pane eventKey="analytics">
                  <EventAnalytics />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}
