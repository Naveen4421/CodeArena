// src/pages/ProblemDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProblemDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);

  useEffect(() => {
    fetchProblem();
  }, [slug]);

  const fetchProblem = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/problems/${slug}`);
      const data = await response.json();
      setProblem(data);
      setCode(data.starterCode?.javascript || '');
    } catch (error) {
      console.error('Error fetching problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    setExecuting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/problems/${problem.id}/run`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          language,
          code,
          customInput: { nums: [2, 7, 11, 15], target: 9 }
        })
      });
      const data = await response.json();
      setRunResult(data);
      setSubmitResult(null);
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setExecuting(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!code.trim()) {
      alert('Please write some code first!');
      return;
    }

    setExecuting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/problems/${problem.id}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          language,
          code
        })
      });
      const data = await response.json();
      setSubmitResult(data);
      setRunResult(null);
    } catch (error) {
      console.error('Error submitting code:', error);
    } finally {
      setExecuting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading problem...</div>;
  }

  if (!problem) {
    return <div className="error">Problem not found</div>;
  }

  return (
    <div className="problem-detail-page">
      <div className="problem-layout">
        {/* Problem Description */}
        <div className="problem-description-section">
          <div className="problem-header">
            <h1>{problem.title}</h1>
            <div className="problem-meta">
              <span className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </span>
              <span className="problem-category">{problem.category}</span>
              <span className="acceptance-rate">Acceptance: {problem.acceptanceRate}%</span>
            </div>
          </div>

          <div className="problem-content">
            <pre className="problem-statement">{problem.description}</pre>
            
            <div className="examples-section">
              <h3>Examples</h3>
              {problem.examples.map((example, idx) => (
                <div key={idx} className="example">
                  <div className="example-input">
                    <strong>Input:</strong> {JSON.stringify(example.input)}
                  </div>
                  <div className="example-output">
                    <strong>Output:</strong> {JSON.stringify(example.output)}
                  </div>
                  {example.explanation && (
                    <div className="example-explanation">
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="constraints-section">
              <h3>Constraints</h3>
              <ul>
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx}>{constraint}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Code Editor & Results */}
        <div className="code-editor-section">
          <div className="editor-header">
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-selector"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
            
            <div className="editor-actions">
              <button 
                onClick={handleRun} 
                className="run-btn"
                disabled={executing}
              >
                {executing ? 'Running...' : 'Run Code'}
              </button>
              <button 
                onClick={handleSubmit} 
                className="submit-btn"
                disabled={executing}
              >
                {executing ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>

          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={20}
            placeholder={`Write your