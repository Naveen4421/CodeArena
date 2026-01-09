// src/pages/admin/Dashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Problems', value: '25', color: 'blue' },
    { label: 'Total Users', value: '1,234', color: 'green' },
    { label: 'Submissions Today', value: '89', color: 'purple' },
    { label: 'Active Users', value: '56', color: 'orange' }
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="btn-admin-action">+ Add New Problem</button>
          <button className="btn-admin-action">View All Problems</button>
          <button className="btn-admin-action">Manage Users</button>
          <button className="btn-admin-action">View Submissions</button>
        </div>
      </div>
      
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-text">User "john_doe" solved "Two Sum"</div>
            <div className="activity-time">5 minutes ago</div>
          </div>
          <div className="activity-item">
            <div className="activity-text">New problem "Palindrome Linked List" added</div>
            <div className="activity-time">2 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;