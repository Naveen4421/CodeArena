// src/components/Header.jsx (Updated)
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Header.css";

function Header({ 
  problemSlug, 
  onChangeProblem, 
  language, 
  onChangeLanguage, 
  onRun, 
  onSubmit, 
  loading 
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const problems = [
    { slug: "two-sum", title: "Two Sum" },
    { slug: "reverse-integer", title: "Reverse Integer" },
    { slug: "palindrome-number", title: "Palindrome Number" },
    { slug: "valid-parentheses", title: "Valid Parentheses" },
    { slug: "merge-two-sorted-lists", title: "Merge Two Sorted Lists" }
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowUserMenu(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowUserMenu(false);
  };

  return (
    <header className="header">
      {/* Left Section: Logo & Navigation */}
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-icon">💻</span>
          <span className="logo-text">CodePlatform</span>
        </Link>
        
        <nav className="main-nav">
          <Link to="/" className="nav-link">
            <i className="fas fa-home"></i>
            Home
          </Link>
          <Link to="/problems" className="nav-link">
            <i className="fas fa-code"></i>
            Problems
          </Link>
          <Link to="/playground" className="nav-link">
            <i className="fas fa-terminal"></i>
            Playground
          </Link>
          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link admin">
              <i className="fas fa-crown"></i>
              Admin
            </Link>
          )}
        </nav>
      </div>
      
      {/* Center Section: Problem Selector & Language (only on problem pages) */}
      {(problemSlug || language) && (
        <div className="header-center">
          {problemSlug && (
            <div className="problem-selector">
              <select 
                value={problemSlug}
                onChange={(e) => onChangeProblem(e.target.value)}
                className="problem-select"
              >
                <option value="">Select Problem</option>
                {problems.map((prob) => (
                  <option key={prob.slug} value={prob.slug}>
                    {prob.title}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {language && (
            <select 
              className="language-select"
              value={language}
              onChange={(e) => onChangeLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
          )}
        </div>
      )}
      
      {/* Right Section: Auth & Actions */}
      <div className="header-right">
        {/* Run & Submit buttons (only on problem pages) */}
        {(onRun || onSubmit) && (
          <div className="action-buttons">
            {onRun && (
              <button 
                className="run-btn"
                onClick={onRun}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Running...
                  </>
                ) : (
                  <>
                    <i className="fas fa-play"></i>
                    Run
                  </>
                )}
              </button>
            )}
            
            {onSubmit && (
              <button 
                className="submit-btn" 
                onClick={onSubmit} 
                disabled={loading}
              >
                <i className="fas fa-paper-plane"></i>
                Submit
              </button>
            )}
          </div>
        )}
        
        {/* User Menu */}
        <div className="user-section">
          {user ? (
            <div className="user-menu-container">
              <button 
                className="user-avatar"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="avatar">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
                <span className="username">{user.username}</span>
                <i className={`fas fa-chevron-${showUserMenu ? 'up' : 'down'}`}></i>
              </button>
              
              {showUserMenu && (
                <div className="dropdown-menu">
                  <div className="user-info">
                    <div className="user-email">{user.email}</div>
                    <div className="user-stats">
                      <span className="stat">
                        <i className="fas fa-check-circle"></i>
                        {user.solvedProblems?.length || 0} Solved
                      </span>
                    </div>
                  </div>
                  <hr />
                  <button onClick={handleProfileClick} className="dropdown-item">
                    <i className="fas fa-user"></i>
                    Profile
                  </button>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <i className="fas fa-sign-out-alt"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                <i className="fas fa-sign-in-alt"></i>
                Login
              </Link>
              <Link to="/register" className="register-btn">
                <i className="fas fa-user-plus"></i>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;