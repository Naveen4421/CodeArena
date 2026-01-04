function ResultView({ result }) {
  return (
    <div className="result-view">
      <div className={`result-details ${result.status === "Success" ? "result-success" : "result-error"}`}>
        {result.output}
      </div>
      
      {result.testResults && result.testResults.length > 0 && (
        <div className="test-results">
          {result.testResults.map((test, index) => (
            <div key={index} className={`test-result-item ${test.passed ? "passed" : "failed"}`}>
              <div className="test-case-header">
                <span>{test.testCase}</span>
                <span className={test.passed ? "status-passed" : "status-failed"}>
                  {test.passed ? "✓ Passed" : "✗ Failed"}
                </span>
              </div>
              <div className="test-case-input">Input: {test.input}</div>
              <div className="test-case-output">Output: {test.output}</div>
              {!test.passed && test.expected && (
                <div className="test-case-expected">Expected: {test.expected}</div>
              )}
              {test.explanation && (
                <div className="test-case-explanation" style={{ color: '#ccc', fontSize: '12px', marginTop: '5px' }}>
                  {test.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {result.runtime && result.memory && (
        <div className="stats-container">
          <div className="stat-item">
            <span className="stat-label">Runtime</span>
            <span className="stat-value">{result.runtime}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Memory</span>
            <span className="stat-value">{result.memory}</span>
          </div>
          {result.beats && (
            <div className="stat-item">
              <span className="stat-label">Beats</span>
              <span className="stat-value">{result.beats}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
