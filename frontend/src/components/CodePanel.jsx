import Editor from "@monaco-editor/react";

export default function CodePanel({ language, setLanguage, code, setCode }) {
  const boilerplate = {
    python: `class Solution:
    def successfulPairs(self, spells, potions, success):
        pass`,
    cpp: `class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        
    }
};`,
    c: `int* successfulPairs(int* spells, int spellsSize, int* potions, int potionsSize, long long success, int* returnSize) {
    
}`,
    js: `var successfulPairs = function(spells, potions, success) {
    
};`
  };

  return (
    <div className="code-panel">
      <div className="editor-header">
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setCode(boilerplate[e.target.value]);
          }}
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="js">JavaScript</option>
        </select>
      </div>

      <Editor
        height="100%"
        theme="vs-dark"
        language={language === "js" ? "javascript" : language}
        value={code}
        onChange={(v) => setCode(v || "")}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}

