import { useState } from "react";
import Editor from "@monaco-editor/react";
import ResultView from "./components/ResultView";
import ProblemDescription from "./components/ProblemDescription";
import "./App.css";

/* ✅ Boilerplate per language */
const boilerplate = {
  javascript: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
  return [];
}`,

  python: `class Solution:
    def twoSum(self, nums, target):
        mp = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in mp:
                return [mp[diff], i]
            mp[num] = i
        return []`,

  cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int,int> mp;
        for(int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if(mp.count(diff)) return {mp[diff], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`,

  c: `#include <stdlib.h>

int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    int* res = malloc(2 * sizeof(int));
    for(int i = 0; i < numsSize; i++) {
        for(int j = i + 1; j < numsSize; j++) {
            if(nums[i] + nums[j] == target) {
                res[0] = i;
                res[1] = j;
                *returnSize = 2;
                return res;
            }
        }
    }
    *returnSize = 0;
    return res;
}`
};

function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(boilerplate.javascript);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ✅ Handle language change like LeetCode */
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
    setCode(boilerplate[lang]);
  };

  const submitCode = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("http://localhost:3000/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: 1,
          language, // js | python | cpp | c
          code
        })
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ status: "Error", error: "Backend not reachable" });
    }

    setLoading(false);
  };

  return (
    <div className="leetcode-layout">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <ProblemDescription />
        <div className="result-section">
          <h3>Result</h3>
          {result && <ResultView result={result} />}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="editor-header">
          <select value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
          </select>

          <button onClick={submitCode} disabled={loading}>
            {loading ? "Running..." : "Submit"}
          </button>
        </div>

        <Editor
          height="100%"
          theme="vs-dark"
          language={
            language === "cpp" ? "cpp" :
            language === "c" ? "c" :
            language
          }
          value={code}
          onChange={(v) => setCode(v || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            automaticLayout: true
          }}
        />
      </div>
    </div>
  );
}

export default App;

