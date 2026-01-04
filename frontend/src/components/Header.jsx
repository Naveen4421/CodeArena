import React from "react";
import "./Header.css";

function Header({ 
  problemSlug, 
  onChangeProblem, 
  language, 
  onChangeLanguage, 
  onRun, 
  onSubmit, 
  loading 
}) {
  const problems = [
    { slug: "two-sum", title: "Two Sum" },
    { slug: "reverse-integer", title: "Reverse Integer" },
    { slug: "palindrome-number", title: "Palindrome Number" },
    { slug: "valid-parentheses", title: "Valid Parentheses" },
    { slug: "merge-two-sorted-lists", title: "Merge Two Sorted Lists" }
  ];

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">LeetCode Clone</div>
        <div className="problem-selector">
          <select 
            value={problemSlug}
            onChange={(e) => onChangeProblem(e.target.value)}
          >
            {problems.map((prob) => (
              <option key={prob.slug} value={prob.slug}>
                {prob.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="header-center">
        <select 
          className="language-select"
          value={language}
          onChange={(e) => onChangeLanguage(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
        </select>
      </div>
      
      <div className="header-right">
        <button 
          className="run-btn"
          onClick={onRun}
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
              Run
            </>
          )}
        </button>
        <button 
          className="submit-btn" 
          onClick={onSubmit} 
          disabled={loading}
        >
          <i className="fas fa-paper-plane"></i>
          Submit
        </button>
      </div>
    </header>
  );
}

export default Header;
