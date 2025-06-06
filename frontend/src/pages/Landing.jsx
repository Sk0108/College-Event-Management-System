import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center py-5">
      <h1 className="mb-4"> Welcome to College Event Management System</h1>
      <p className="lead mb-5">Select your portal:</p>
      <div className="d-flex justify-content-center gap-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate('/student/login')}
        >
          Student Login
        </button>
        <button
          className="btn btn-warning btn-lg"
          onClick={() => navigate('/staff/login')}
        >
          Staff Login
        </button>
        <a
          className="btn btn-dark btn-lg"
          href="http://127.0.0.1:8000/admin/login/?next=/admin/"
        >
          Admin Login
        </a>
      </div>
    </div>
  );
};

export default Landing;
