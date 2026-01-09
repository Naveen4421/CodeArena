// src/hooks/useProblems.js
import { useState, useCallback } from 'react';
import { problemService } from '../services/problemService';

export const useProblems = (initialFilters = {}) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    difficulty: 'All',
    category: 'All',
    search: '',
    sortBy: 'createdAt',
    order: 'desc',
    ...initialFilters
  });

  const fetchProblems = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await problemService.getProblems(filters);
      setProblems(data.problems || []);
      setPagination(data.pagination || {});
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch problems');
      setProblems([]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 20,
      difficulty: 'All',
      category: 'All',
      search: '',
      sortBy: 'createdAt',
      order: 'desc'
    });
  }, []);

  const nextPage = useCallback(() => {
    if (pagination.hasNextPage) {
      setFilters(prev => ({ ...prev, page: prev.page + 1 }));
    }
  }, [pagination]);

  const prevPage = useCallback(() => {
    if (pagination.hasPrevPage) {
      setFilters(prev => ({ ...prev, page: prev.page - 1 }));
    }
  }, [pagination]);

  return {
    problems,
    loading,
    error,
    pagination,
    filters,
    fetchProblems,
    setFilters: updateFilters,
    resetFilters,
    nextPage,
    prevPage,
    refetch: fetchProblems
  };
};