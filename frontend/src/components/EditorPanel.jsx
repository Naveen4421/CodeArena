import Editor from "@monaco-editor/react";

export default function EditorPanel({ 
  language, 
  code, 
  onChangeCode,
  onRun,
  onSubmit,
  loading,
  result 
}) {
  return (
    <div className="editor-panel">
      {/* Header */}
      <div className="editor-header">
        <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
        <div className="editor-actions">
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
      </div>

      {/* Editor */}
      <Editor
        height="55vh"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={onChangeCode}
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

      {/* Result - Now ResultPanel is separate, so remove if you have separate ResultPanel component */}
      {/* ResultPanel is now handled by parent component */}
    </div>
  );
}
