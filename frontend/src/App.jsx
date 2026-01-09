// src/App.jsx - Updated with Auth
import React, { useState, useEffect } from 'react';
import './App.css';
import './styles/auth.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [problemData, setProblemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState('');
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form states
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Check backend connection and auth status on mount
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/health');
        if (response.ok) {
          setBackendStatus('connected');
          
          // Check if user is already logged in
          const token = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');
          
          if (token && storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
          }
          
          fetchProblem();
        } else {
          setBackendStatus('error');
          setError('Backend responded with error');
        }
      } catch (err) {
        setBackendStatus('error');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkBackend();
  }, []);

  // Fetch problem data
  const fetchProblem = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/problems/two-sum');
      const data = await response.json();
      setProblemData(data);
      setCode(data.starterCode.javascript);
    } catch (err) {
      setError('Failed to fetch problem: ' + err.message);
    }
  };

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setIsAuthenticated(true);
      setUser(data.user);
      setShowLoginForm(false);
      setLoginEmail('');
      setLoginPassword('');
      
    } catch (err) {
      setAuthError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    // Validate passwords match
    if (registerData.password !== registerData.confirmPassword) {
      setAuthError('Passwords do not match');
      setAuthLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setAuthError('Password must be at least 6 characters');
      setAuthLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password: registerData.password
        })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      
      // Store auth data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update state
      setIsAuthenticated(true);
      setUser(data.user);
      setShowRegisterForm(false);
      setRegisterData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (err) {
      setAuthError(err.message || 'Registration failed. Please try again.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Run code (protected)
  const handleRun = async () => {
    if (!isAuthenticated) {
      setShowLoginForm(true);
      return;
    }

    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/problems/1/run', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          language: 'javascript',
          code,
          customInput: { nums: [2, 7, 11, 15], target: 9 }
        })
      });
      const data = await response.json();
      setRunResult(data);
      setSubmitResult(null);
    } catch (err) {
      setRunResult({
        success: false,
        message: 'Error running code: ' + err.message
      });
    }
  };

  // Submit code (protected)
  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setShowLoginForm(true);
      return;
    }

    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/problems/1/submit', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          language: 'javascript',
          code
        })
      });
      const data = await response.json();
      setSubmitResult(data);
      setRunResult(null);
      
      // Update user stats if successful
      if (data.status === 'Accepted' && user) {
        const updatedUser = {
          ...user,
          submissions: (user.submissions || 0) + 1,
          solvedProblems: [...(user.solvedProblems || []), 1]
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (err) {
      setSubmitResult({
        status: 'Error',
        message: 'Error submitting code: ' + err.message
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
        <p>Checking backend connection...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Header with Auth */}
      <header className="app-header">
        <h1>🚀 Coding Platform - Full Stack Test</h1>
        
        <div className="header-right">
          <div className={`backend-status status-${backendStatus}`}>
            Backend: {backendStatus === 'connected' ? '✅ Connected' : '❌ Disconnected'}
          </div>
          
          {/* User/Auth Section */}
          <div className="user-section">
            {isAuthenticated ? (
              <div className="user-menu">
                <div className="user-info">
                  <div className="avatar">
                    {user?.username?.charAt(0).toUpperCase()}
                  </div>
                  <span className="username">{user?.username}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <button 
                  onClick={() => {
                    setShowLoginForm(true);
                    setShowRegisterForm(false);
                  }} 
                  className="login-btn"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    setShowRegisterForm(true);
                    setShowLoginForm(false);
                  }} 
                  className="register-btn"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Auth Modals */}
      {showLoginForm && !isAuthenticated && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <div className="modal-header">
              <h2>Login</h2>
              <button 
                onClick={() => setShowLoginForm(false)} 
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            {authError && (
              <div className="auth-error">
                {authError}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={authLoading}
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={authLoading}
                />
              </div>
              
              <button 
                type="submit" 
                className="auth-button"
                disabled={authLoading}
              >
                {authLoading ? 'Logging in...' : 'Login'}
              </button>
              
              <div className="auth-links">
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setShowLoginForm(false);
                      setShowRegisterForm(true);
                    }} 
                    className="auth-link"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {showRegisterForm && !isAuthenticated && (
        <div className="modal-overlay">
          <div className="auth-modal">
            <div className="modal-header">
              <h2>Create Account</h2>
              <button 
                onClick={() => setShowRegisterForm(false)} 
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            {authError && (
              <div className="auth-error">
                {authError}
              </div>
            )}
            
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={registerData.username}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    username: e.target.value
                  })}
                  placeholder="Choose a username"
                  required
                  disabled={authLoading}
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    email: e.target.value
                  })}
                  placeholder="Enter your email"
                  required
                  disabled={authLoading}
                />
              </div>
              
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    password: e.target.value
                  })}
                  placeholder="Create a password (min. 6 characters)"
                  required
                  disabled={authLoading}
                />
              </div>
              
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value
                  })}
                  placeholder="Confirm your password"
                  required
                  disabled={authLoading}
                />
              </div>
              
              <button 
                type="submit" 
                className="auth-button"
                disabled={authLoading}
              >
                {authLoading ? 'Creating account...' : 'Sign Up'}
              </button>
              
              <div className="auth-links">
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button"
                    onClick={() => {
                      setShowRegisterForm(false);
                      setShowLoginForm(true);
                    }} 
                    className="auth-link"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="error-box">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Auth Status Banner */}
      {!isAuthenticated && (
        <div className="auth-banner">
          <p>
            <strong>🔐 Authentication Required:</strong> 
            Please login or register to save your progress and submit solutions.
          </p>
          <div className="banner-actions">
            <button 
              onClick={() => setShowLoginForm(true)}
              className="banner-btn primary"
            >
              Login
            </button>
            <button 
              onClick={() => setShowRegisterForm(true)}
              className="banner-btn secondary"
            >
              Register
            </button>
          </div>
        </div>
      )}

      <div className="main-content">
        {/* Left Column - Problem Description */}
        <div className="problem-section">
          <div className="section-header">
            <h2>Problem Description</h2>
            {problemData && (
              <div className="problem-meta">
                <span className={`difficulty-badge ${problemData.difficulty.toLowerCase()}`}>
                  {problemData.difficulty}
                </span>
                <span className="problem-category">{problemData.category}</span>
              </div>
            )}
          </div>

          {problemData ? (
            <div className="problem-content">
              <h3>{problemData.title}</h3>
              <pre className="problem-description">{problemData.description}</pre>
              
              <h4>Examples:</h4>
              {problemData.examples.map((example, idx) => (
                <div key={idx} className="example">
                  <p><strong>Input:</strong> {JSON.stringify(example.input)}</p>
                  <p><strong>Output:</strong> {JSON.stringify(example.output)}</p>
                  {example.explanation && (
                    <p><strong>Explanation:</strong> {example.explanation}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No problem data loaded</p>
          )}
        </div>

        {/* Right Column - Code Editor & Results */}
        <div className="editor-section">
          <div className="section-header">
            <h2>Code Editor</h2>
            <select className="language-selector">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={20}
            placeholder="Write your solution here..."
          />

          <div className="button-group">
            <button onClick={handleRun} className="btn-run">
              Run Code
            </button>
            <button onClick={handleSubmit} className="btn-submit">
              Submit
            </button>
          </div>

          {/* Auth Notice for non-logged in users */}
          {!isAuthenticated && (
            <div className="auth-notice">
              <p><strong>⚠️ Login Required:</strong> You need to login to run and submit code.</p>
            </div>
          )}

          {/* User Stats for logged in users */}
          {isAuthenticated && user && (
            <div className="user-stats-bar">
              <div className="stat">
                <span className="stat-label">Solved:</span>
                <span className="stat-value">{user.solvedProblems?.length || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Submissions:</span>
                <span className="stat-value">{user.submissions || 0}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Role:</span>
                <span className="stat-value">{user.role}</span>
              </div>
            </div>
          )}

          {/* Run Results */}
          {runResult && (
            <div className={`result-box ${runResult.success ? 'success' : 'error'}`}>
              <h3>Run Result</h3>
              <pre>{runResult.message}</pre>
              {runResult.results && (
                <div>
                  <p><strong>Test Results:</strong></p>
                  {runResult.results.map((result, idx) => (
                    <div key={idx} className="test-result">
                      <p>Input: {JSON.stringify(result.input)}</p>
                      <p>Expected: {JSON.stringify(result.expected)}</p>
                      <p>Output: {JSON.stringify(result.output)}</p>
                      <p>Status: {result.passed ? '✅ Passed' : '❌ Failed'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Submit Results */}
          {submitResult && (
            <div className={`result-box ${submitResult.status === 'Accepted' ? 'success' : 'error'}`}>
              <h3>Submission Result</h3>
              <p><strong>Status:</strong> {submitResult.status}</p>
              <p><strong>Message:</strong> {submitResult.message}</p>
              <p><strong>Runtime:</strong> {submitResult.runtime} ms</p>
              <p><strong>Memory:</strong> {submitResult.memory} KB</p>
              <p><strong>Passed:</strong> {submitResult.passedCases}/{submitResult.totalCases} test cases</p>
              
              {submitResult.results && (
                <div>
                  <p><strong>Detailed Results:</strong></p>
                  {submitResult.results.map((result, idx) => (
                    <div key={idx} className={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                      <p>Test {idx + 1}: {result.passed ? '✅' : '❌'}</p>
                      <p>Input: {JSON.stringify(result.input)}</p>
                      <p>Expected: {JSON.stringify(result.expected)}</p>
                      <p>Output: {JSON.stringify(result.output)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <h3>Testing Instructions:</h3>
        <ol>
          <li>1. <strong>Register/Login:</strong> Create an account or login</li>
          <li>2. <strong>Run Code:</strong> Test with sample input</li>
          <li>3. <strong>Submit:</strong> Run all test cases</li>
          <li>4. Try solving the Two Sum problem!</li>
        </ol>
        <p><strong>Sample Solution:</strong></p>
        <pre className="sample-solution">
{`var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};`}
        </pre>
      </div>
    </div>
  );
}

export default App;