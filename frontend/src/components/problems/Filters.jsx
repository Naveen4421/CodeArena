// src/components/problems/Filters.jsx
import React, { useState } from 'react';
import { DIFFICULTIES, CATEGORIES } from '../../utils/constants';

const Filters = ({ filters, onFilterChange }) => {
  const [localSearch, setLocalSearch] = useState(filters.search || '');

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange({ search: localSearch });
  };

  return (
    <div className="filters-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search problems..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="filter-controls">
        <div className="filter-group">
          <label>Difficulty:</label>
          <select
            value={filters.difficulty}
            onChange={(e) => onFilterChange({ difficulty: e.target.value })}
            className="filter-select"
          >
            {DIFFICULTIES.map(diff => (
              <option key={diff.value} value={diff.value}>
                {diff.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Category:</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="filter-select"
          >
            {CATEGORIES.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
            className="filter-select"
          >
            <option value="createdAt">Newest</option>
            <option value="difficulty">Difficulty</option>
            <option value="acceptanceRate">Acceptance Rate</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {(filters.difficulty !== 'All' || filters.category !== 'All' || filters.search) && (
        <div className="active-filters">
          <span>Active filters:</span>
          {filters.difficulty !== 'All' && (
            <span className="active-filter">
              Difficulty: {filters.difficulty}
              <button onClick={() => onFilterChange({ difficulty: 'All' })}>×</button>
            </span>
          )}
          {filters.category !== 'All' && (
            <span className="active-filter">
              Category: {filters.category}
              <button onClick={() => onFilterChange({ category: 'All' })}>×</button>
            </span>
          )}
          {filters.search && (
            <span className="active-filter">
              Search: "{filters.search}"
              <button onClick={() => { onFilterChange({ search: '' }); setLocalSearch(''); }}>×</button>
            </span>
          )}
          <button 
            className="clear-all"
            onClick={() => {
              onFilterChange({ 
                difficulty: 'All', 
                category: 'All', 
                search: '' 
              });
              setLocalSearch('');
            }}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;