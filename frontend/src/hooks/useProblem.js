// src/hooks/useProblem.js
import { useState, useCallback } from 'react';
import { problemService } from '../services/problemService';

export const useProblem = (slug) => {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solved, setSolved] = useState(false);

  const fetchProblem = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await problemService.getProblem(slug);
      setProblem(data);
      
      // Check if problem is solved
      try {
        const solvedData = await problemService.checkSolved(data.id);
        setSolved(solvedData.solved);
      } catch (err) {
        // Ignore solved check error
        console.log('Could not check solved status:', err.message);
      }
      
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch problem');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const markAsSolved = useCallback(() => {
    setSolved(true);
  }, []);

  return {
    problem,
    loading,
    error,
    solved,
    fetchProblem,
    markAsSolved,
    refetch: fetchProblem
  };
};