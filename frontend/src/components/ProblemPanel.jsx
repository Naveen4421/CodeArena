export default function ProblemPanel() {
  return (
    <div className="problem-panel">
      <h1 className="problem-title">1. Two Sum</h1>

      <div className="problem-section">
        <p>
          Given an array of integers <code>nums</code> and an integer{" "}
          <code>target</code>, return <b>indices of the two numbers</b> such that
          they add up to <code>target</code>.
        </p>

        <p>
          You may assume that each input would have <b>exactly one solution</b>,
          and you may not use the same element twice.
        </p>

        <p>You can return the answer in any order.</p>
      </div>

      <div className="problem-section">
        <h3>Example 1:</h3>
        <pre>
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] == 9
        </pre>
      </div>

      <div className="problem-section">
        <h3>Example 2:</h3>
        <pre>
Input: nums = [3,2,4], target = 6
Output: [1,2]
        </pre>
      </div>

      <div className="problem-section">
        <h3>Constraints:</h3>
        <ul>
          <li><code>2 ≤ nums.length ≤ 10⁴</code></li>
          <li><code>-10⁹ ≤ nums[i] ≤ 10⁹</code></li>
          <li><code>-10⁹ ≤ target ≤ 10⁹</code></li>
          <li><b>Only one valid answer exists.</b></li>
        </ul>
      </div>
    </div>
  );
}

