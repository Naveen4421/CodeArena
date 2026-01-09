// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Layout.css';

const AdminLayout = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <div className="app-layout admin-layout">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Panel</h1>
          <Link to="/" className="back-to-site">
            ← Back to Site
          </Link>
        </div>
      </header>
      
      <div className="main-container">
        {/* Admin Sidebar */}
        <aside className="sidebar admin-sidebar">
          <nav className="sidebar-nav">
            <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
              📊 Dashboard
            </Link>
            <Link to="/admin/problems" className={`nav-link ${isActive('/admin/problems')}`}>
              📝 Problems
            </Link>
            <Link to="/admin/users" className={`nav-link ${isActive('/admin/users')}`}>
              👥 Users
            </Link>
            <Link to="/admin/submissions" className={`nav-link ${isActive('/admin/submissions')}`}>
              📄 Submissions
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;