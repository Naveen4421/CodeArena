// src/pages/Problems.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    difficulty: 'all',
    category: 'all',
    search: ''
  });

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/problems');
      const data = await response.json();
      setProblems(data.problems || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems = problems.filter(problem => {
    if (filters.difficulty !== 'all' && problem.difficulty !== filters.difficulty) {
      return false;
    }
    if (filters.category !== 'all' && problem.category !== filters.category) {
      return false;
    }
    if (filters.search && !problem.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const categories = ['All', 'Array', 'String', 'Math', 'Dynamic Programming', 'Tree', 'Graph'];

  return (
    <div className="problems-page">
      <div className="page-header">
        <h1>Problems</h1>
        <p>Practice coding problems to improve your skills</p>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search problems..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Difficulty:</label>
            <select
              value={filters.difficulty}
              onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff.toLowerCase()}>{diff}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Category:</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Problems Table */}
      <div className="problems-table-container">
        {loading ? (
          <div className="loading">Loading problems...</div>
        ) : (
          <table className="problems-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Difficulty</th>
                <th>Category</th>
                <th>Acceptance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map(problem => (
                <tr key={problem.id}>
                  <td className="status-cell">
                    <span className="status-dot">○</span>
                  </td>
                  <td className="title-cell">
                    <Link to={`/problem/${problem.slug}`}>
                      {problem.title}
                    </Link>
                  </td>
                  <td className="difficulty-cell">
                    <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="category-cell">{problem.category}</td>
                  <td className="acceptance-cell">{problem.acceptanceRate}%</td>
                  <td className="action-cell">
                    <Link to={`/problem/${problem.slug}`} className="solve-link">
                      Solve
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filteredProblems.length === 0 && (
          <div className="no-problems">
            <p>No problems found. Try changing your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Problems;