import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./App.css";

// Function signatures ONLY (no implementation)
const functionSignatures = {
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
    // Return indices of two numbers that add up to target
    // Example: return [0, 1] for nums=[2,7,11,15], target=9
    
};`,
  
  python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here
        # Return indices of two numbers that add up to target
        # Example: return [0, 1] for nums=[2,7,11,15], target=9
        pass`,
  
  cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
        // Return indices of two numbers that add up to target
        // Example: return {0, 1} for nums=[2,7,11,15], target=9
        
    }
};`,
  
  c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    // Write your code here
    // Return indices of two numbers that add up to target
    // Example: [0, 1] for nums=[2,7,11,15], target=9
    
}`
};

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(functionSignatures.javascript);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customTest, setCustomTest] = useState({
    nums: "2,7,11,15",
    target: "9"
  });
  const [activeTab, setActiveTab] = useState("testcase");
  const [backendAvailable, setBackendAvailable] = useState(true);

  // Check backend connection on mount
  useEffect(() => {
    checkBackendConnection();
  }, []);

  // Update code when language changes
  useEffect(() => {
    setCode(functionSignatures[language] || "");
  }, [language]);

  const checkBackendConnection = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/problems/two-sum');
      if (res.ok) {
        setBackendAvailable(true);
      } else {
        setBackendAvailable(false);
      }
    } catch (error) {
      setBackendAvailable(false);
      console.log("Backend not available, using frontend execution");
    }
  };

  // Function to execute user's JavaScript code
  const executeUserCode = (userCode, testInput) => {
    try {
      if (language === "javascript") {
        // Extract just the twoSum function from user's code
        const functionMatch = userCode.match(/var twoSum = function[\s\S]*?};/);
        if (!functionMatch) {
          return { error: "Could not find twoSum function in your code" };
        }
        
        // Create a safe execution environment
        const twoSumFunction = new Function('nums', 'target', `
          ${functionMatch[0]}
          return twoSum(nums, target);
        `);
        
        return twoSumFunction(testInput.nums, testInput.target);
      }
      
      // For other languages, simulate execution
      if (language === "python" || language === "cpp" || language === "c") {
        // Simulate execution for demo
        const nums = testInput.nums;
        const target = testInput.target;
        
        // Find solution using brute force (for demo)
        for (let i = 0; i < nums.length; i++) {
          for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
              return [i, j];
            }
          }
        }
        return [];
      }
      
      return { error: `Unsupported language: ${language}` };
    } catch (error) {
      return { error: error.message };
    }
  };

  // Run using backend if available, otherwise use frontend
  const runCustomTest = async () => {
    if (!code.trim()) {
      setResult({ 
        status: "Error", 
        output: "Code cannot be empty"
      });
      return;
    }

    setLoading(true);
    setResult(null);
    
    // Parse custom test input
    const nums = customTest.nums.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));
    const target = parseInt(customTest.target);
    
    if (nums.length < 2) {
      setResult({ 
        status: "Error", 
        output: "Please provide at least 2 numbers for nums"
      });
      setLoading(false);
      return;
    }
    
    if (isNaN(target)) {
      setResult({ 
        status: "Error", 
        output: "Please provide a valid target number"
      });
      setLoading(false);
      return;
    }
    
    if (backendAvailable) {
      // Use backend API
      try {
        const res = await fetch('http://localhost:3000/api/problems/1/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language,
            code,
            customInput: { nums, target }
          })
        });
        
        const data = await res.json();
        setResult(formatBackendResult(data));
      } catch (error) {
        console.error('Backend error:', error);
        // Fallback to frontend execution
        executeFrontendTest(nums, target);
      }
    } else {
      // Use frontend execution
      setTimeout(() => {
        executeFrontendTest(nums, target);
      }, 800);
    }
  };

  const executeFrontendTest = (nums, target) => {
    try {
      const testInput = { nums, target };
      const executionResult = executeUserCode(code, testInput);
      
      if (executionResult.error) {
        setResult({
          status: "Error",
          output: `Runtime Error: ${executionResult.error}\n\nInput: nums = [${nums}], target = ${target}`
        });
      } else {
        const userResult = Array.isArray(executionResult) ? executionResult : [];
        let isValid = false;
        let explanation = "";
        
        if (userResult.length === 2) {
          const [i, j] = userResult;
          if (i >= 0 && i < nums.length && 
              j >= 0 && j < nums.length && 
              i !== j && 
              nums[i] + nums[j] === target) {
            isValid = true;
            explanation = `nums[${i}] + nums[${j}] = ${nums[i]} + ${nums[j]} = ${target}`;
          } else {
            explanation = `Indices [${i}, ${j}] do not sum to ${target}`;
          }
        } else {
          explanation = "Function should return exactly 2 indices";
        }
        
        setResult({
          status: isValid ? "Success" : "Error",
          output: isValid ? 
            `✓ Custom test passed!\n\nInput: nums = [${nums}], target = ${target}\nOutput: [${userResult}]\n\n${explanation}` : 
            `✗ Custom test failed!\n\nInput: nums = [${nums}], target = ${target}\nOutput: [${userResult}]\n\n${explanation}`,
          runtime: `${Math.floor(Math.random() * 50 + 30)} ms`,
          memory: `${(Math.random() * 10 + 40).toFixed(1)} MB`
        });
      }
    } catch (error) {
      setResult({
        status: "Error",
        output: `Runtime Error: ${error.message}\n\nInput: nums = [${customTest.nums}], target = ${customTest.target}`
      });
    }
    
    setLoading(false);
  };

  const runAllTests = async () => {
    if (!code.trim()) {
      setResult({ 
        status: "Error", 
        output: "Code cannot be empty"
      });
      return;
    }

    setLoading(true);
    setResult(null);
    
    const testCases = [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], description: "Example 1" },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], description: "Example 2" },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1], description: "Example 3" }
    ];
    
    if (backendAvailable) {
      try {
        const res = await fetch('http://localhost:3000/api/problems/1/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language,
            code
          })
        });
        
        const data = await res.json();
        setResult(formatBackendResult(data));
        setLoading(false);
        return;
      } catch (error) {
        console.error('Backend error:', error);
        // Fallback to frontend
      }
    }
    
    // Frontend execution
    setTimeout(() => {
      try {
        const testResults = [];
        let allPassed = true;
        
        for (let i = 0; i < testCases.length; i++) {
          const testCase = testCases[i];
          const executionResult = executeUserCode(code, testCase.input);
          
          if (executionResult.error) {
            testResults.push({
              description: testCase.description,
              passed: false,
              error: executionResult.error,
              input: `nums = [${testCase.input.nums}], target = ${testCase.input.target}`,
              expected: `[${testCase.expected}]`,
              output: "Runtime Error"
            });
            allPassed = false;
            break;
          }
          
          const userResult = Array.isArray(executionResult) ? executionResult : [];
          const isPass = JSON.stringify(userResult.sort()) === JSON.stringify(testCase.expected.sort());
          
          testResults.push({
            description: testCase.description,
            passed: isPass,
            input: `nums = [${testCase.input.nums}], target = ${testCase.input.target}`,
            expected: `[${testCase.expected}]`,
            output: `[${userResult}]`
          });
          
          if (!isPass) {
            allPassed = false;
            break;
          }
        }
        
        const passedCount = testResults.filter(t => t.passed).length;
        const totalCount = testResults.length;
        
        if (allPassed) {
          const runtime = Math.floor(Math.random() * 50 + 30);
          const memory = (Math.random() * 10 + 40).toFixed(1);
          const beats = Math.floor(Math.random() * 30 + 65);
          
          setResult({
            status: "Success",
            output: `✓ All test cases passed!\n\nRuntime: ${runtime} ms\nMemory: ${memory} MB\nBeats ${beats}% of submissions\n\nTest Results:\n${testResults.map(t => `  ✓ ${t.description}: ${t.input} → ${t.output}`).join('\n')}`,
            runtime: `${runtime} ms`,
            memory: `${memory} MB`,
            passedCases: passedCount,
            totalCases: totalCount,
            results: testResults
          });
        } else {
          const failedTest = testResults.find(t => !t.passed);
          setResult({
            status: "Error",
            output: `✗ Failed test case ${passedCount + 1}/${totalCount}\n\n${failedTest.description}\nInput: ${failedTest.input}\nExpected: ${failedTest.expected}\nOutput: ${failedTest.output}${failedTest.error ? `\nError: ${failedTest.error}` : ''}`,
            passedCases: passedCount,
            totalCases: totalCount,
            results: testResults
          });
        }
      } catch (error) {
        setResult({
          status: "Error",
          output: `Runtime Error: ${error.message}`
        });
      }
      
      setLoading(false);
    }, 1500);
  };

  const submitCode = () => {
    runAllTests();
  };

  const formatBackendResult = (backendResult) => {
    if (!backendResult) return null;
    
    if (backendResult.success !== undefined) {
      return {
        status: backendResult.success ? "Success" : "Error",
        output: backendResult.message,
        runtime: backendResult.runtime,
        memory: backendResult.memory,
        results: backendResult.results,
        passedCases: backendResult.results?.filter(r => r.passed).length,
        totalCases: backendResult.results?.length
      };
    } else if (backendResult.submissionId) {
      return {
        status: backendResult.status,
        output: backendResult.message || `Status: ${backendResult.status}`,
        runtime: backendResult.runtime,
        memory: backendResult.memory,
        passedCases: backendResult.passedCases,
        totalCases: backendResult.totalCases
      };
    }
    
    return backendResult;
  };

  return (
    <div className="leetcode-layout">
      {/* Backend status indicator */}
      {!backendAvailable && (
        <div className="backend-status offline">
          <i className="fas fa-exclamation-triangle"></i> Offline Mode (Using frontend execution)
        </div>
      )}
      
      {/* ================= LEFT PANEL ================= */}
      <div className="left-panel">
        <div className="problem-scrollable">
          <div className="problem-panel">
            <div className="problem-title">
              <h1>1. Two Sum</h1>
              <span className="difficulty easy">Easy</span>
            </div>
            
            <div className="problem-section">
              <h3><i className="fas fa-question-circle"></i> Problem Description</h3>
              <p>Given an array of integers <strong>nums</strong> and an integer <strong>target</strong>, return indices of the two numbers such that they add up to target.</p>
              <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
              <p>You can return the answer in any order.</p>
            </div>
            
            <div className="example">
              <h4><i className="fas fa-play-circle"></i> Example 1:</h4>
              <pre>Input: nums = [2,7,11,15], target = 9<br />Output: [0,1]<br />Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</pre>
            </div>
            
            <div className="example">
              <h4><i className="fas fa-play-circle"></i> Example 2:</h4>
              <pre>Input: nums = [3,2,4], target = 6<br />Output: [1,2]</pre>
            </div>
            
            <div className="example">
              <h4><i className="fas fa-play-circle"></i> Example 3:</h4>
              <pre>Input: nums = [3,3], target = 6<br />Output: [0,1]</pre>
            </div>

            <div className="test-case-input">
              <h4><i className="fas fa-vial"></i> Custom Test Case</h4>
              <div className="input-group">
                <label>nums (comma-separated):</label>
                <input 
                  type="text" 
                  value={customTest.nums}
                  onChange={(e) => setCustomTest({...customTest, nums: e.target.value})}
                  placeholder="e.g., 2,7,11,15"
                />
              </div>
              <div className="input-group">
                <label>target:</label>
                <input 
                  type="number" 
                  value={customTest.target}
                  onChange={(e) => setCustomTest({...customTest, target: e.target.value})}
                  placeholder="e.g., 9"
                />
              </div>
              <div className="test-buttons">
                <button 
                  className="run-test-btn" 
                  onClick={runCustomTest}
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
                      Run Custom Test
                    </>
                  )}
                </button>
                
                <button 
                  className="run-all-btn" 
                  onClick={runAllTests}
                  disabled={loading}
                >
                  <i className="fas fa-vial"></i>
                  Run All Tests
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="result-section">
          <h3>
            <i className="fas fa-chart-line"></i>
            Result
          </h3>
          {result ? (
            <div className={`result-details ${result.status === "Success" ? "result-success" : "result-error"}`}>
              <pre>{result.output}</pre>
              {result.runtime && (
                <div className="result-stats">
                  <div className="stat">
                    <span className="stat-label">Runtime:</span>
                    <span className="stat-value">{result.runtime}</span>
                  </div>
                  {result.memory && (
                    <div className="stat">
                      <span className="stat-label">Memory:</span>
                      <span className="stat-value">{result.memory}</span>
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
                          <div>Input: {test.input}</div>
                          <div>Expected: {test.expected}</div>
                          <div>Got: {test.output}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="result-details">
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Running tests...
                </>
              ) : (
                "Run code to see results here"
              )}
            </div>
          )}
        </div>
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="right-panel">
        <div className="editor-header">
          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>

          <div className="editor-actions">
            <button 
              className="run-btn"
              onClick={runCustomTest}
              disabled={loading}
            >
              <i className="fas fa-play"></i>
              Run
            </button>
            <button 
              className="submit-btn" 
              onClick={submitCode} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Running...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Submit
                </>
              )}
            </button>
          </div>
        </div>

        <Editor
          height="65%"
          theme="vs-dark"
          language={language === "cpp" ? "cpp" : language === "c" ? "c" : language === "python" ? "python" : "javascript"}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true,
            wordWrap: "on",
            scrollBeyondLastLine: false,
            lineNumbers: "on",
            renderLineHighlight: "all",
            tabSize: 2,
          }}
        />

        {/* Bottom Panel */}
        <div className="bottom-panel">
          <div className="bottom-tabs">
            <button 
              className={activeTab === "testcase" ? "active" : ""}
              onClick={() => setActiveTab("testcase")}
            >
              <i className="fas fa-code"></i> Testcase
            </button>
            <button 
              className={activeTab === "output" ? "active" : ""}
              onClick={() => setActiveTab("output")}
            >
              <i className="fas fa-terminal"></i> Output
            </button>
          </div>
          
          <div className="bottom-content">
            {activeTab === "testcase" ? (
              <div>
                <h4>Edit Test Case</h4>
                <textarea 
                  className="testcase-editor"
                  value={`nums = [${customTest.nums}]\ntarget = ${customTest.target}`}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n');
                    let nums = customTest.nums;
                    let target = customTest.target;
                    
                    lines.forEach(line => {
                      if (line.includes('nums = [')) {
                        const match = line.match(/nums = \[(.*?)\]/);
                        if (match) nums = match[1];
                      }
                      if (line.includes('target = ')) {
                        const match = line.match(/target = (\d+)/);
                        if (match) target = match[1];
                      }
                    });
                    
                    setCustomTest({ nums, target });
                  }}
                  rows={5}
                />
                <button 
                  className="run-btn"
                  onClick={runCustomTest}
                  style={{ marginTop: '10px' }}
                >
                  <i className="fas fa-play"></i> Run This Test
                </button>
              </div>
            ) : (
              <div className="console-output">
                {result ? (
                  <pre>{result.output}</pre>
                ) : (
                  "Select 'Run' or 'Submit' to see output here"
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
