// src/services/userService.js
import api from './api';

export const userService = {
  // Get user profile
  async getProfile() {
    return await api.get('/users/profile');
  },

  // Update user profile
  async updateProfile(userData) {
    return await api.put('/users/profile', userData);
  },

  // Get user stats
  async getStats(userId) {
    return await api.get(`/users/${userId}/stats`);
  },

  // Get user's submission history
  async getSubmissionHistory(userId, params = {}) {
    return await api.get(`/users/${userId}/submissions`, { params });
  },

  // Get user's solved problems
  async getSolvedProblems(userId) {
    return await api.get(`/users/${userId}/solved`);
  },

  // Admin: Get all users
  async getAllUsers(params = {}) {
    return await api.get('/admin/users', { params });
  },

  // Admin: Update user role
  async updateUserRole(userId, role) {
    return await api.put(`/admin/users/${userId}/role`, { role });
  },

  // Admin: Delete user
  async deleteUser(userId) {
    return await api.delete(`/admin/users/${userId}`);
  }
};