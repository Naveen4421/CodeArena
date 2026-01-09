// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: '🏠', label: 'Dashboard' },
    { path: '/problems', icon: '📚', label: 'Problems' },
    { path: '/playground', icon: '⚡', label: 'Playground' },
    { path: '/profile', icon: '👤', label: 'Profile' },
  ];

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${isActive(item.path)}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
        
        <div className="sidebar-divider"></div>
        
        <div className="sidebar-stats">
          <h4>Quick Stats</h4>
          <div className="stat-item">
            <span className="stat-label">Problems Solved</span>
            <span className="stat-value">0</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Current Streak</span>
            <span className="stat-value">0 days</span>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;