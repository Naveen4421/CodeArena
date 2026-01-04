function ResultPanel({ result }) {
  if (!result) {
    return (
      <div className="result-panel">
        <h3><i className="fas fa-chart-line"></i> Result</h3>
        <div className="result-placeholder">
          Run code to see results here
        </div>
      </div>
    );
  }

  return (
    <div className="result-panel">
      <h3><i className="fas fa-chart-line"></i> Result</h3>
      <div className={`result-content ${result.status === "Success" ? "success" : "error"}`}>
        <div className="result-message">{result.message}</div>
        
        {result.runtime && (
          <div className="result-stats">
            <div className="stat">
              <span className="stat-label">Runtime:</span>
              <span className="stat-value">{result.runtime} ms</span>
            </div>
            {result.memory && (
              <div className="stat">
                <span className="stat-label">Memory:</span>
                <span className="stat-value">{result.memory} KB</span>
              </div>
            )}
            {result.passedCases !== undefined && (
              <div className="stat">
                <span className="stat-label">Test Cases:</span>
                <span className="stat-value">{result.passedCases}/{result.totalCases}</span>
              </div>
            )}
          </div>
        )}
        
        {result.results && result.results.length > 0 && (
          <div className="test-details">
            <h4>Test Results:</h4>
            {result.results.map((test, idx) => (
              <div key={idx} className={`test-result ${test.passed ? "passed" : "failed"}`}>
                <span>Test {idx + 1}: {test.passed ? "✓ Passed" : "✗ Failed"}</span>
                {!test.passed && (
                  <div className="test-failure">
                    <div>Input: {JSON.stringify(test.input)}</div>
                    <div>Expected: {JSON.stringify(test.expected)}</div>
                    <div>Got: {JSON.stringify(test.output)}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPanel;
