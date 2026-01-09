// src/pages/Playground.jsx
import React, { useState } from 'react';

const Playground = () => {
  const [code, setCode] = useState('// Write your JavaScript code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    // Mock execution for now
    setOutput('Hello, World!\nCode executed successfully!');
  };

  const handleClear = () => {
    setOutput('');
  };

  return (
    <div className="playground-page">
      <h1>Code Playground</h1>
      <p className="subtitle">Test your code without solving a specific problem</p>
      
      <div className="playground-layout">
        <div className="editor-section">
          <div className="editor-header">
            <select className="language-selector">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
          
          <textarea
            className="code-editor"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={20}
            placeholder="Write your code here..."
          />
          
          <div className="editor-actions">
            <button onClick={handleRun} className="btn-run">Run Code</button>
            <button onClick={() => setCode('')} className="btn-clear">Clear</button>
          </div>
        </div>
        
        <div className="output-section">
          <div className="output-header">
            <h3>Output</h3>
            <button onClick={handleClear} className="btn-clear-output">Clear Output</button>
          </div>
          <pre className="output-content">{output || 'Output will appear here...'}</pre>
        </div>
      </div>
    </div>
  );
};

export default Playground;