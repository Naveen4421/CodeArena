import { useState } from "react";
import Editor from "@monaco-editor/react";
import ResultPanel from "./ResultPanel";

export default function EditorPanel() {
  const [code, setCode] = useState(
`function twoSum(nums, target) {
  return [];
}`
  );

  const [result, setResult] = useState(null);

  const submitCode = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: 1,
          language: "javascript",
          code
        })
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ status: "Backend not reachable" });
    }
  };

  return (
    <div className="editor-panel">

      {/* Header */}
      <div className="editor-header">
        <span>JavaScript</span>
        <div>
          <button className="run-btn">Run</button>
          <button className="submit-btn" onClick={submitCode}>
            Submit
          </button>
        </div>
      </div>

      {/* Editor */}
      <Editor
        height="55vh"
        theme="vs-dark"
        language="javascript"
        value={code}
        onChange={(v) => setCode(v)}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false
        }}
      />

      {/* Result */}
      <ResultPanel result={result} />

    </div>
  );
}
