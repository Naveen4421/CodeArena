// src/components/problems/ProblemCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getDifficultyColor } from '../../utils/helpers';

const ProblemCard = ({ problem }) => {
  return (
    <Link to={`/problem/${problem.slug}`} className="problem-card">
      <div className="problem-card-content">
        <div className="problem-header">
          <h3 className="problem-title">{problem.title}</h3>
          <span className={`difficulty-badge ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        
        <div className="problem-meta">
          <span className="problem-category">{problem.category}</span>
          <span className="problem-id">#{problem.id}</span>
        </div>
        
        <div className="problem-stats">
          <div className="stat">
            <span className="stat-label">Acceptance</span>
            <span className="stat-value">{problem.acceptanceRate || 0}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Submissions</span>
            <span className="stat-value">{problem.totalSubmissions || 0}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProblemCard;