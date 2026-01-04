function BottomPanel({ activeTab, setActiveTab, customTest, setCustomTest, onRunTest }) {
  return (
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
                // Parse textarea content
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
              onClick={onRunTest}
              style={{ marginTop: '10px' }}
            >
              <i className="fas fa-play"></i> Run This Test
            </button>
          </div>
        ) : (
          <div className="console-output">
            {/* Output will be shown from ResultView */}
            Select "Run" or "Submit" to see output here
          </div>
        )}
      </div>
    </div>
  );
}
