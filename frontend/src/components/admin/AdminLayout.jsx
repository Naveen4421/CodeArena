// components/admin/AdminLayout.jsx
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

const AdminLayout = () => {
    const location = useLocation();
    
    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/problems', label: 'Problems', icon: '📝' },
        { path: '/admin/problems/new', label: 'Add Problem', icon: '➕' },
        { path: '/admin/users', label: 'Users', icon: '👥' },
        { path: '/admin/submissions', label: 'Submissions', icon: '📄' },
        { path: '/admin/logs', label: 'Activity Logs', icon: '📋' },
    ];

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <h2>Admin Panel</h2>
                <nav>
                    {menuItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-link ${
                                location.pathname === item.path ? 'active' : ''
                            }`}
                        >
                            <span className="icon">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>
            
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};
