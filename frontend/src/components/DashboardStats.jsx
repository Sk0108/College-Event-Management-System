import React from 'react';
import { Card, Row, Col, ProgressBar } from 'react-bootstrap';

export default function DashboardStats({ stats }) {
    if (!stats) {
        return <div>Loading...</div>; // or return null;
    }
    return (
        <Row className="mb-4">
            <Col md={4}>
                <Card className="text-center p-3 shadow-sm">
                    <h6>Registered Users</h6>
                    <h3>{stats.totalUsers}</h3>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="text-center p-3 shadow-sm">
                    <h6>This Month</h6>
                    <h3>{stats.thisMonth}</h3>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="text-center p-3 shadow-sm">
                    <h6>Last Month</h6>
                    <h3>{stats.lastMonth}</h3>
                </Card>
            </Col>
            <Col md={6} className="mt-4">
                <Card className="p-3 shadow-sm">
                    <h6>Pending Events</h6>
                    <ProgressBar now={stats.pendingAmount || 70} label={`${stats.pendingAmount || 70}%`} />
                </Card>
            </Col>
            <Col md={6} className="mt-4">
                <Card className="p-3 shadow-sm">
                    <h6>Pending Users</h6>
                    <ProgressBar variant="success" now={stats.pendingUsers || 90} label={`${stats.pendingUsers || 90}%`} />
                </Card>
            </Col>
        </Row>
    );
}
