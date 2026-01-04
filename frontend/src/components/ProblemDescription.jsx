import React from "react";
import "./ProblemDescription.css";

function ProblemDescription({ 
  customTest, 
  setCustomTest, 
  onRunTest, 
  testLoading,
  onRunAllTests 
}) {
  return (
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
      
      <div className="problem-section">
        <h3><i className="fas fa-clipboard-check"></i> Constraints</h3>
        <ul>
          <li>2 ≤ nums.length ≤ 10⁴</li>
          <li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
          <li>-10⁹ ≤ target ≤ 10⁹</li>
          <li>Only one valid answer exists.</li>
        </ul>
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
          
          <button 
            className="run-all-btn" 
            onClick={onRunAllTests}
            disabled={testLoading}
          >
            <i className="fas fa-vial"></i>
            Run All Tests
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;
