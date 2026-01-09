// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    submissionCount: 0,
    accuracy: 0,
    streak: 0
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      // Fetch user submissions
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/submissions', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      }

      // Calculate stats
      const solvedProblems = user?.solvedProblems?.length || 0;
      setStats({
        totalSolved: solvedProblems,
        easySolved: Math.floor(solvedProblems * 0.6),
        mediumSolved: Math.floor(solvedProblems * 0.3),
        hardSolved: Math.floor(solvedProblems * 0.1),
        submissionCount: user?.submissions || 0,
        accuracy: 75,
        streak: 7
      });
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-large">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-join-date">
              Member since {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card-large">
          <div className="stat-title">Problems Solved</div>
          <div className="stat-value-large">{stats.totalSolved}</div>
          <div className="stat-breakdown">
            <span className="difficulty-easy">Easy: {stats.easySolved}</span>
            <span className="difficulty-medium">Medium: {stats.mediumSolved}</span>
            <span className="difficulty-hard">Hard: {stats.hardSolved}</span>
          </div>
        </div>

        <div className="stat-card-large">
          <div className="stat-title">Submissions</div>
          <div className="stat-value-large">{stats.submissionCount}</div>
          <div className="stat-detail">Accuracy: {stats.accuracy}%</div>
        </div>

        <div className="stat-card-large">
          <div className="stat-title">Current Streak</div>
          <div className="stat-value-large">{stats.streak} days</div>
          <div className="stat-detail">Keep it up!</div>
        </div>
      </div>

      {/* Submission History */}
      <div className="submission-history">
        <h2>Recent Submissions</h2>
        {submissions.length > 0 ? (
          <div className="submissions-list">
            {submissions.slice(0, 5).map((submission, index) => (
              <div key={index} className="submission-item">
                <div className="submission-problem">
                  <span className="problem-title">{submission.problemTitle}</span>
                  <span className="submission-time">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="submission-details">
                  <span className={`submission-status ${submission.status.toLowerCase()}`}>
                    {submission.status}
                  </span>
                  <span className="submission-runtime">{submission.runtime} ms</span>
                  <span className="submission-memory">{submission.memory} KB</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-submissions">
            <p>No submissions yet. Start solving problems!</p>
          </div>
        )}
      </div>

      {/* Activity Chart (Placeholder) */}
      <div className="activity-chart">
        <h2>Activity Heatmap</h2>
        <div className="chart-placeholder">
          <p>Activity visualization will appear here</p>
          <div className="heatmap">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="heatmap-day" style={{ opacity: Math.random() * 0.8 + 0.2 }}></div>
            ))}
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="profile-settings">
        <h2>Account Settings</h2>
        <div className="settings-options">
          <button className="setting-btn">Change Password</button>
          <button className="setting-btn">Update Profile</button>
          <button className="setting-btn">Notification Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;