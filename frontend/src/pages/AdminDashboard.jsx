import React, { useState } from 'react';
import { Container, Tab, Row, Col, Button } from 'react-bootstrap';
import CreateUserForm from './CreateUserForm';
import EventApprovals from './EventApprovals';
import ApprovedEvents from './ApprovedEvents';
import EventAnalytics from './EventAnalytics';
import BulkUploadUsers from './BulkUploadUsers';
import RejectedEvents from './RejectedEvents'; // ✅ Import the new component
import '../styles.css';

export default function AdminDashboard({ onLogout }) {
  const [activeKey, setActiveKey] = useState('create-user');

  return (
    <div className="dashboard-container">
      {/* Admin Header */}
      <div className="d-flex justify-content-between align-items-center" style={{ padding: '2rem 2rem 1rem 2rem' }}>
        <h2
          className="text-white"
          style={{
            fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif",
            letterSpacing: '2px',
            fontWeight: 700,
            fontSize: '2.5rem',
            textShadow: '2px 2px 8px #222, 0 0 10px #00e6e6',
            textAlign: 'center',
            width: '100%',
            marginBottom: 0
          }}
        >
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
          <a
            className="navbar-brand"
            href="#"
            style={{
              fontWeight: 600,
              color: 'purple',
              fontFamily: "'Orbitron', 'Segoe UI', Arial, sans-serif"
            }}
          >
            Admin Panel
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav" style={{ color: 'black' }}>
              <li className="nav-item">
                <a className={`nav-link${activeKey === 'create-user' ? ' active' : ''}`} href="#" onClick={() => setActiveKey('create-user')} style={{ color: 'black' }}>Create User</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link${activeKey === 'upload-csv' ? ' active' : ''}`} href="#" onClick={() => setActiveKey('upload-csv')} style={{ color: 'black' }}>Create Bulk Users</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link${activeKey === 'approve-events' ? ' active' : ''}`} href="#" onClick={() => setActiveKey('approve-events')} style={{ color: 'black' }}>Approve Events</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link${activeKey === 'approved-events' ? ' active' : ''}`} href="#" onClick={() => setActiveKey('approved-events')} style={{ color: 'black' }}>Approved Events</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link${activeKey === 'rejected-events' ? ' active' : ''}`} href="#" onClick={() => setActiveKey('rejected-events')} style={{ color: 'black' }}>Rejected Events</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link${activeKey === 'analytics' ? ' active' : ''}`} href="#" onClick={() => setActiveKey('analytics')} style={{ color: 'black' }}>Analytics</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Content */}
      <Container fluid>
        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="create-user">
                  <div className="glass-card">
                    <CreateUserForm />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="upload-csv">
                  <div className="glass-card">
                    <BulkUploadUsers />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="approve-events">
                  <div className="glass-card">
                    <EventApprovals onRefreshApproved={() => setActiveKey('approved-events')} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="approved-events">
                  <div className="glass-card">
                    <ApprovedEvents />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="rejected-events">
                  <div className="glass-card">
                    <RejectedEvents />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="analytics">
                  <div className="glass-card">
                    <EventAnalytics />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}
