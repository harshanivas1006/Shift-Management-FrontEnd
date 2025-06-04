import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import './dashboard.css';
import CalendarPage from './CalendarPage';

const DashboardPage = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Shift Management Calendar View</h1>
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </header>

      <main className="dashboard-main">
        <CalendarPage />
      </main>
    </div>
  );
};

export default DashboardPage;
