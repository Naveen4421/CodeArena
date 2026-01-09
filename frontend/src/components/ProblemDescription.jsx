import { useState, useEffect } from "react";
import "./ProblemDescription.css";

function ProblemPanel({ 
  problemSlug, 
  customTest, 
  setCustomTest, 
  onRunTest, 
  testLoading,
  onRunAllTests 
}) {
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch problem data when slug changes
  useEffect(() => {
    const fetchProblem = async () => {
      if (!problemSlug) return;
      
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/problems/${problemSlug}`);
        const data = await res.json();
        setProblem(data);
      } catch (error) {
        console.error('Failed to fetch problem:', error);
        setProblem(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProblem();
  }, [problemSlug]);

  if (loading) {
    return <div className="loading">Loading problem...</div>;
  }

  if (!problem) {
    return <div className="error">Problem not found</div>;
  }

  return (
    <div className="problem-panel">
      <div className="problem-title">
        <h1>{problem.title}</h1>
        <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>
      </div>
      
      <div className="problem-section">
        <h3><i className="fas fa-question-circle"></i> Problem Description</h3>
        <div className="description-content">
          {problem.description.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      
      {problem.examples && problem.examples.length > 0 && (
        <div className="problem-section">
          <h3><i className="fas fa-play-circle"></i> Examples</h3>
          {problem.examples.map((example, index) => (
            <div key={index} className="example">
              <h4>Example {index + 1}:</h4>
              <pre>
                Input: {JSON.stringify(example.input)}
                {example.output && `\nOutput: ${JSON.stringify(example.output)}`}
                {example.explanation && `\nExplanation: ${example.explanation}`}
              </pre>
            </div>
          ))}
        </div>
      )}
      
      {problem.constraints && problem.constraints.length > 0 && (
        <div className="problem-section">
          <h3><i className="fas fa-exclamation-circle"></i> Constraints</h3>
          <ul>
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="test-case-input">
        <h4><i className="fas fa-vial"></i> Custom Test Case</h4>
        <div className="input-group">
          <label>Input (JSON format):</label>
          <textarea 
            value={customTest.input}
            onChange={(e) => setCustomTest({...customTest, input: e.target.value})}
            placeholder={`e.g., {"nums": [2,7,11,15], "target": 9}`}
            rows={3}
          />
        </div>
        <div className="test-buttons">
          <button 
            className="run-test-btn" 
            onClick={onRunTest}
            disabled={testLoading}
          >
            {testLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Running...
              </>
            ) : (
              <>
                <i className="fas fa-play"></i>
                Run Custom Test
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProblemPanel;
