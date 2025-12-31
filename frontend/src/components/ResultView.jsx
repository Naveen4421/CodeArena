function ResultView({ result }) {
  return (
    <div className={`result-card ${result.status}`}>
      <h3>{result.status}</h3>

      {result.failedTestCase && (
        <>
          <p>❌ Failed Test Case: {result.failedTestCase}</p>
          <p>Expected: <code>{result.expected}</code></p>
          <p>Received: <code>{result.received}</code></p>
        </>
      )}

      {result.executionMs && (
        <p>⏱ Execution Time: {result.executionMs} ms</p>
      )}
    </div>
  );
}

export default ResultView;

