// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { Container, Nav, Tab, Row, Col, Card, Button } from 'react-bootstrap';
import CreateUserForm from './CreateUserForm';
import EventApprovals from './EventApprovals';
import ApprovedEvents from './ApprovedEvents';
import EventAnalytics from './EventAnalytics';
import BulkUploadUsers from './BulkUploadUsers';
import '../styles.css';

export default function AdminDashboard({ onLogout }) {
  const [activeKey, setActiveKey] = useState('create-user');

  return (
    <div className="dashboard-container">
      <Container fluid>
        <div className="dashboard-header">
          <h2>🛠️ Admin Dashboard</h2>
          <Button variant="outline-danger" onClick={onLogout}>Logout</Button>
        </div>

        <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column tab-panel">
                <Nav.Item><Nav.Link eventKey="create-user">Create Users</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="upload-csv">Upload CSV</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="approve-events">Approve Events</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="approved-events">Approved Events</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link eventKey="analytics">Analytics</Nav.Link></Nav.Item>
              </Nav>
            </Col>

            <Col sm={9}>
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
                    <EventApprovals />
                  </div>
                </Tab.Pane>

                <Tab.Pane eventKey="approved-events">
                  <div className="glass-card">
                    <ApprovedEvents />
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
