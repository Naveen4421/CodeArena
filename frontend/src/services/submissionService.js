// src/services/submissionService.js
import api from './api';

export const submissionService = {
  // Run code (test without submitting)
  async runCode(data) {
    return await api.post('/submissions/run', data);
  },

  // Submit solution
  async submitSolution(data) {
    return await api.post('/submissions', data);
  },

  // Get user's submissions
  async getSubmissions(params = {}) {
    return await api.get('/submissions', { params });
  },

  // Get single submission
  async getSubmission(id) {
    return await api.get(`/submissions/${id}`);
  },

  // Get submission statistics
  async getSubmissionStats(userId) {
    return await api.get(`/submissions/stats/${userId}`);
  },

  // Get leaderboard
  async getLeaderboard(params = {}) {
    return await api.get('/submissions/leaderboard', { params });
  },

  // Admin: Get all submissions
  async getAllSubmissions(params = {}) {
    return await api.get('/admin/submissions', { params });
  },

  // Admin: Re-evaluate submission
  async reevaluateSubmission(id) {
    return await api.post(`/admin/submissions/${id}/reevaluate`);
  }
};