// src/services/problemService.js
import api from './api';

export const problemService = {
  // Get all problems with filters
  async getProblems(params = {}) {
    return await api.get('/problems', { params });
  },

  // Get single problem by slug
  async getProblem(slug) {
    return await api.get(`/problems/${slug}`);
  },

  // Get problem by ID
  async getProblemById(id) {
    return await api.get(`/problems/id/${id}`);
  },

  // Get random problem
  async getRandomProblem(filters = {}) {
    return await api.get('/problems/random', { params: filters });
  },

  // Get problem statistics
  async getStats() {
    return await api.get('/problems/stats/count');
  },

  // Get user's solved problems
  async getSolvedProblems(userId) {
    return await api.get(`/users/${userId}/solved`);
  },

  // Check if problem is solved
  async checkSolved(problemId) {
    return await api.get(`/submissions/check?problemId=${problemId}`);
  },

  // Get problem categories
  async getCategories() {
    return await api.get('/problems/categories');
  },

  // Get difficulties
  async getDifficulties() {
    return await api.get('/problems/difficulties');
  },

  // Admin: Create problem
  async createProblem(problemData) {
    return await api.post('/admin/problems', problemData);
  },

  // Admin: Update problem
  async updateProblem(id, problemData) {
    return await api.put(`/admin/problems/${id}`, problemData);
  },

  // Admin: Delete problem
  async deleteProblem(id) {
    return await api.delete(`/admin/problems/${id}`);
  },

  // Admin: Get all problems (including hidden data)
  async getAllProblems(params = {}) {
    return await api.get('/admin/problems', { params });
  },

  // Admin: Toggle problem visibility
  async toggleProblemVisibility(id) {
    return await api.put(`/admin/problems/${id}/toggle`);
  }
};