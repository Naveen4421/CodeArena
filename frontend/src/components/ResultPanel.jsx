export default function ResultPanel({ result }) {
  return (
    <div className="result-panel">
      <h3>Result</h3>
      <pre>
        {result ? JSON.stringify(result, null, 2) : "Run or Submit code"}
      </pre>
    </div>
  );
}
