// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProblems: 0,
    solvedProblems: 0,
    submissions: 0,
    accuracy: 0
  });

  useEffect(() => {
    // Fetch user stats from backend
    const fetchStats = async () => {
      try {
        // For now, use mock data
        setStats({
          totalProblems: 50,
          solvedProblems: user?.solvedProblems?.length || 0,
          submissions: user?.submissions || 0,
          accuracy: 75
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="home-page">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1>Welcome back, {user?.username}!</h1>
        <p>Ready to solve some coding challenges today?</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{stats.solvedProblems}</div>
            <div className="stat-label">Problems Solved</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <div className="stat-value">{stats.submissions}</div>
            <div className="stat-label">Total Submissions</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <div className="stat-value">{stats.accuracy}%</div>
            <div className="stat-label">Accuracy</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">0</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/problems" className="action-btn primary">
            Browse Problems
          </Link>
          <Link to="/playground" className="action-btn secondary">
            Try Playground
          </Link>
          <Link to="/profile" className="action-btn outline">
            View Profile
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          {user?.solvedProblems && user.solvedProblems.length > 0 ? (
            <div className="activity-item">
              <div className="activity-icon">✅</div>
              <div className="activity-content">
                <p>You solved <strong>Two Sum</strong></p>
                <span className="activity-time">Just now</span>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>No activity yet. Start solving problems!</p>
              <Link to="/problems" className="btn-link">
                Browse Problems →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Problems */}
      <div className="recommended-problems">
        <h2>Recommended for You</h2>
        <div className="problems-grid">
          <div className="problem-card-small">
            <h3>Two Sum</h3>
            <p>Easy • Array • Hash Table</p>
            <Link to="/problem/two-sum" className="solve-btn">
              Solve Problem
            </Link>
          </div>
          <div className="problem-card-small">
            <h3>Palindrome Number</h3>
            <p>Easy • Math</p>
            <Link to="/problem/palindrome-number" className="solve-btn">
              Solve Problem
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;