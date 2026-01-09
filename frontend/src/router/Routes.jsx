// src/router/Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home';
import Problems from '../pages/Problems';
import ProblemDetail from '../pages/ProblemDetail';
import Playground from '../pages/Playground';
import AdminLayout from '../components/layout/AdminLayout';
import AdminDashboard from '../pages/admin/Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="problems" element={<Problems />} />
        <Route path="problem/:slug" element={<ProblemDetail />} />
        <Route path="playground" element={<Playground />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;