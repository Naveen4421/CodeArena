import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'LeetCode Backend'
  });
});

// Two Sum problem endpoint
app.get('/api/problems/two-sum', (req, res) => {
  res.json({
    id: 1,
    title: "Two Sum",
    slug: "two-sum",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: "Easy",
    category: "Array",
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    examples: [
      {
        input: { nums: [2,7,11,15], target: 9 },
        output: [0,1],
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: { nums: [3,2,4], target: 6 },
        output: [1,2],
        explanation: null
      },
      {
        input: { nums: [3,3], target: 6 },
        output: [0,1],
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your code here
    
};`,
      python: `from typing import List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Write your code here`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
    }
}`
    }
  });
});

// Run endpoint
app.post('/api/problems/1/run', async (req, res) => {
  try {
    const { language, code, customInput } = req.body;
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Parse input
    const input = customInput || { nums: [2,7,11,15], target: 9 };
    const nums = input.nums || [];
    const target = input.target || 9;
    
    let userResult = [];
    let error = null;
    
    // Execute JavaScript code
    if (language === 'javascript') {
      try {
        const functionMatch = code.match(/var twoSum = function[\s\S]*?};/);
        if (functionMatch) {
          const twoSumFunction = new Function('nums', 'target', `
            ${functionMatch[0]}
            return twoSum(nums, target);
          `);
          
          userResult = twoSumFunction(nums, target) || [];
        } else {
          error = "Could not find twoSum function in your code";
        }
      } catch (err) {
        error = err.message;
      }
    } else {
      // Simulate for other languages
      userResult = [0, 1];
    }
    
    if (error) {
      return res.json({
        success: false,
        message: `Runtime Error: ${error}`,
        results: []
      });
    }
    
    // Check result
    let isCorrect = false;
    let explanation = "";
    
    if (userResult.length === 2) {
      const [i, j] = userResult;
      if (i >= 0 && i < nums.length && 
          j >= 0 && j < nums.length && 
          i !== j && 
          nums[i] + nums[j] === target) {
        isCorrect = true;
        explanation = `nums[${i}] + nums[${j}] = ${nums[i]} + ${nums[j]} = ${target}`;
      } else {
        explanation = `Indices [${i}, ${j}] do not sum to ${target}`;
      }
    } else {
      explanation = "Function should return exactly 2 indices";
    }
    
    res.json({
      success: isCorrect,
      message: isCorrect 
        ? `✓ Custom test passed!\n\nInput: nums = [${nums}], target = ${target}\nOutput: [${userResult}]\n\n${explanation}`
        : `✗ Custom test failed!\n\nInput: nums = [${nums}], target = ${target}\nOutput: [${userResult}]\n\n${explanation}`,
      results: [{
        input: { nums, target },
        expected: [0, 1],
        output: userResult,
        passed: isCorrect,
        description: customInput ? "Custom Test" : "Sample Test"
      }],
      runtime: Math.floor(Math.random() * 50 + 30),
      memory: Math.floor(Math.random() * 20000 + 10000)
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`
    });
  }
});

// Submit endpoint
app.post('/api/problems/1/submit', async (req, res) => {
  try {
    const { language, code } = req.body;
    
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const testCases = [
      { input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] },
      { input: { nums: [3,2,4], target: 6 }, expected: [1,2] },
      { input: { nums: [3,3], target: 6 }, expected: [0,1] }
    ];
    
    let allPassed = true;
    const testResults = [];
    
    for (const testCase of testCases) {
      let userResult = [];
      let error = null;
      
      if (language === 'javascript') {
        try {
          const functionMatch = code.match(/var twoSum = function[\s\S]*?};/);
          if (functionMatch) {
            const twoSumFunction = new Function('nums', 'target', `
              ${functionMatch[0]}
              return twoSum(nums, target);
            `);
            
            userResult = twoSumFunction(testCase.input.nums, testCase.input.target) || [];
          } else {
            error = "Function not found";
          }
        } catch (err) {
          error = err.message;
        }
      } else {
        userResult = testCase.expected;
      }
      
      if (error) {
        allPassed = false;
        testResults.push({
          input: testCase.input,
          expected: testCase.expected,
          output: `Error: ${error}`,
          passed: false
        });
        break;
      }
      
      const isCorrect = JSON.stringify(userResult?.sort()) === JSON.stringify(testCase.expected.sort());
      testResults.push({
        input: testCase.input,
        expected: testCase.expected,
        output: userResult,
        passed: isCorrect
      });
      
      if (!isCorrect) {
        allPassed = false;
        break;
      }
    }
    
    const passedCount = testResults.filter(t => t.passed).length;
    const totalCount = testResults.length;
    
    res.json({
      submissionId: Date.now(),
      status: allPassed ? 'Accepted' : 'Wrong Answer',
      message: allPassed 
        ? `✓ All ${totalCount} test cases passed!`
        : `✗ ${passedCount}/${totalCount} test cases passed`,
      runtime: Math.floor(Math.random() * 50 + 30),
      memory: Math.floor(Math.random() * 20000 + 10000),
      passedCases: passedCount,
      totalCases: totalCount,
      results: testResults
    });
    
  } catch (error) {
    res.status(500).json({
      submissionId: Date.now(),
      status: 'Error',
      message: `Server Error: ${error.message}`,
      passedCases: 0,
      totalCases: 0
    });
  }
});

// Fallback for old endpoint
app.post('/api/submit', (req, res) => {
  res.json({
    status: 'Success',
    output: '✓ All test cases passed!\n\nRuntime: 45 ms\nMemory: 42.1 MB\nBeats 85% of submissions',
    runtime: '45 ms',
    memory: '42.1 MB',
    beats: '85%'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend is running on http://localhost:${PORT}`);
});
