// components/admin/ProblemForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '@uiw/react-textarea-code-editor';

const ProblemForm = ({ problem = null }) => {
    const navigate = useNavigate();
    const isEditing = !!problem;
    
    const [formData, setFormData] = useState({
        title: problem?.title || '',
        slug: problem?.slug || '',
        description: problem?.description || '',
        difficulty: problem?.difficulty || 'Easy',
        category: problem?.category || 'Array',
        hints: problem?.hints || [''],
        constraints: problem?.constraints || [''],
        examples: problem?.examples || [{ 
            input: '', 
            output: '', 
            explanation: '' 
        }],
        starterCode: problem?.starterCode || {
            javascript: 'function solve(input) {\n    // Your code here\n}',
            python: 'def solve(input):\n    # Your code here',
            java: 'public class Solution {\n    public int[] solve(int[] input) {\n        // Your code here\n    }\n}'
        },
        testCases: problem?.testCases || [
            { input: '', output: '', explanation: '' }
        ],
        hiddenCases: problem?.hiddenCases || []
    });
    
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.title || !formData.description) {
            alert('Title and description are required');
            return;
        }
        
        try {
            const url = isEditing 
                ? `/api/admin/problems/${problem.id}`
                : '/api/admin/problems';
            
            const method = isEditing ? 'PUT' : 'POST';
            
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert(isEditing ? 'Problem updated!' : 'Problem created!');
                navigate('/admin/problems');
            } else {
                alert(data.error || 'Something went wrong');
            }
        } catch (error) {
            alert('Error saving problem');
        }
    };
    
    const addExample = () => {
        setFormData({
            ...formData,
            examples: [...formData.examples, { input: '', output: '', explanation: '' }]
        });
    };
    
    const addTestCase = () => {
        setFormData({
            ...formData,
            testCases: [...formData.testCases, { input: '', output: '', explanation: '' }]
        });
    };
    
    return (
        <div className="problem-form-container">
            <h1>{isEditing ? 'Edit Problem' : 'Add New Problem'}</h1>
            
            <form onSubmit={handleSubmit} className="problem-form">
                {/* Basic Information */}
                <div className="form-section">
                    <h2>Basic Information</h2>
                    
                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="e.g., Two Sum"
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>URL Slug</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({...formData, slug: e.target.value})}
                            placeholder="e.g., two-sum (auto-generated if empty)"
                        />
                        <small>Used in the URL: /problem/[slug]</small>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label>Difficulty</label>
                            <select
                                value={formData.difficulty}
                                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="Array">Array</option>
                                <option value="String">String</option>
                                <option value="Linked List">Linked List</option>
                                <option value="Tree">Tree</option>
                                <option value="Graph">Graph</option>
                                <option value="Dynamic Programming">Dynamic Programming</option>
                                <option value="Backtracking">Backtracking</option>
                                <option value="Sorting">Sorting</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Problem Description */}
                <div className="form-section">
                    <h2>Problem Description</h2>
                    <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        rows={10}
                        placeholder="Describe the problem in detail. Markdown is supported."
                        className="markdown-editor"
                    />
                </div>
                
                {/* Examples */}
                <div className="form-section">
                    <h2>Examples</h2>
                    {formData.examples.map((example, idx) => (
                        <div key={idx} className="example-box">
                            <h4>Example {idx + 1}</h4>
                            <div className="form-group">
                                <label>Input</label>
                                <textarea
                                    value={example.input}
                                    onChange={(e) => {
                                        const newExamples = [...formData.examples];
                                        newExamples[idx].input = e.target.value;
                                        setFormData({...formData, examples: newExamples});
                                    }}
                                    placeholder='e.g., nums = [2,7,11,15], target = 9'
                                />
                            </div>
                            <div className="form-group">
                                <label>Output</label>
                                <textarea
                                    value={example.output}
                                    onChange={(e) => {
                                        const newExamples = [...formData.examples];
                                        newExamples[idx].output = e.target.value;
                                        setFormData({...formData, examples: newExamples});
                                    }}
                                    placeholder='e.g., [0,1]'
                                />
                            </div>
                            <div className="form-group">
                                <label>Explanation (Optional)</label>
                                <textarea
                                    value={example.explanation || ''}
                                    onChange={(e) => {
                                        const newExamples = [...formData.examples];
                                        newExamples[idx].explanation = e.target.value;
                                        setFormData({...formData, examples: newExamples});
                                    }}
                                    placeholder='Explain why this output is correct'
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addExample}>+ Add Example</button>
                </div>
                
                {/* Test Cases */}
                <div className="form-section">
                    <h2>Test Cases</h2>
                    {formData.testCases.map((testCase, idx) => (
                        <div key={idx} className="testcase-box">
                            <h4>Test Case {idx + 1}</h4>
                            <div className="form-group">
                                <label>Input (JSON format)</label>
                                <textarea
                                    value={testCase.input}
                                    onChange={(e) => {
                                        const newTestCases = [...formData.testCases];
                                        newTestCases[idx].input = e.target.value;
                                        setFormData({...formData, testCases: newTestCases});
                                    }}
                                    rows={3}
                                    placeholder='e.g., {"nums": [2,7,11,15], "target": 9}'
                                />
                            </div>
                            <div className="form-group">
                                <label>Expected Output (JSON format)</label>
                                <textarea
                                    value={testCase.output}
                                    onChange={(e) => {
                                        const newTestCases = [...formData.testCases];
                                        newTestCases[idx].output = e.target.value;
                                        setFormData({...formData, testCases: newTestCases});
                                    }}
                                    rows={2}
                                    placeholder='e.g., [0,1]'
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addTestCase}>+ Add Test Case</button>
                </div>
                
                {/* Starter Code */}
                <div className="form-section">
                    <h2>Starter Code</h2>
                    <div className="language-tabs">
                        {Object.keys(formData.starterCode || {}).map(lang => (
                            <button
                                key={lang}
                                type="button"
                                className={`tab-btn ${selectedLanguage === lang ? 'active' : ''}`}
                                onClick={() => setSelectedLanguage(lang)}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                    
                    <CodeEditor
                        value={formData.starterCode[selectedLanguage] || ''}
                        language={selectedLanguage}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                starterCode: {
                                    ...formData.starterCode,
                                    [selectedLanguage]: e.target.value
                                }
                            });
                        }}
                        style={{
                            fontSize: 14,
                            backgroundColor: "#f5f5f5",
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                        }}
                        minHeight={200}
                    />
                </div>
                
                {/* Form Actions */}
                <div className="form-actions">
                    <button type="submit" className="btn-primary">
                        {isEditing ? 'Update Problem' : 'Create Problem'}
                    </button>
                    <button 
                        type="button" 
                        className="btn-secondary"
                        onClick={() => navigate('/admin/problems')}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
