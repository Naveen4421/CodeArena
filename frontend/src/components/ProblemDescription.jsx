import "./ProblemDescription.css";

export default function ProblemDescription() {
  return (
    <div className="problem-box">
      <h2 className="problem-title">Two Sum</h2>

      <p className="problem-desc">
        Given an array of integers <b>nums</b> and an integer <b>target</b>,
        return indices of the two numbers such that they add up to target.
      </p>

      <div className="example">
        <h4>Example</h4>
        <pre>
nums = [2, 7, 11, 15]
target = 9
Output: [0, 1]
        </pre>
      </div>
    </div>
  );
}
