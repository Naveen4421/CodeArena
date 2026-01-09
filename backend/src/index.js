// backend/src/index.js
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// In-memory storage (replace with database later)
const users = [];
const submissions = [];

// Middleware
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));
app.use(express.json());

// Auth middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// ==================== AUTH ROUTES ====================

// Register user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword,
      role: 'user',
      createdAt: new Date().toISOString(),
      solvedProblems: [],
      submissions: 0,
      likedProblems: []
    };

    users.push(user);

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({
      user: userWithoutPassword,
      token,
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return user (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current user
app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

// ==================== PROBLEM ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Coding Platform Backend',
    users: users.length,
    submissions: submissions.length
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

// Get all problems
app.get('/api/problems', (req, res) => {
  const problems = [
    {
      id: 1,
      title: "Two Sum",
      slug: "two-sum",
      difficulty: "Easy",
      category: "Array",
      acceptanceRate: 65,
      totalSubmissions: 1000,
      likes: 150,
      dislikes: 20
    },
    {
      id: 2,
      title: "Reverse Integer",
      slug: "reverse-integer",
      difficulty: "Medium",
      category: "Math",
      acceptanceRate: 45,
      totalSubmissions: 800,
      likes: 120,
      dislikes: 30
    },
    {
      id: 3,
      title: "Palindrome Number",
      slug: "palindrome-number",
      difficulty: "Easy",
      category: "Math",
      acceptanceRate: 70,
      totalSubmissions: 1200,
      likes: 180,
      dislikes: 15
    }
  ];
  
  res.json({
    problems,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalProblems: problems.length,
      hasNextPage: false,
      hasPrevPage: false
    }
  });
});

// ==================== CODE EXECUTION ROUTES ====================

// Run code (test without submitting)
app.post('/api/problems/1/run', authMiddleware, async (req, res) => {
  try {
    const { language, code, customInput } = req.body;
    const userId = req.user.userId;
    
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

// Submit solution
app.post('/api/problems/1/submit', authMiddleware, async (req, res) => {
  try {
    const { language, code } = req.body;
    const userId = req.user.userId;
    
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
    
    // Record submission
    const submission = {
      id: Date.now().toString(),
      userId,
      problemId: 1,
      problemTitle: "Two Sum",
      language,
      code,
      status: allPassed ? 'Accepted' : 'Wrong Answer',
      runtime: Math.floor(Math.random() * 50 + 30),
      memory: Math.floor(Math.random() * 20000 + 10000),
      passedCases: passedCount,
      totalCases: totalCount,
      createdAt: new Date().toISOString()
    };
    
    submissions.push(submission);
    
    // Update user stats if accepted
    if (allPassed) {
      const user = users.find(u => u.id === userId);
      if (user) {
        user.submissions = (user.submissions || 0) + 1;
        if (!user.solvedProblems.includes(1)) {
          user.solvedProblems.push(1);
        }
      }
    }
    
    res.json({
      submissionId: submission.id,
      status: submission.status,
      message: allPassed 
        ? `✓ All ${totalCount} test cases passed!`
        : `✗ ${passedCount}/${totalCount} test cases passed`,
      runtime: submission.runtime,
      memory: submission.memory,
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

// Get user submissions
app.get('/api/submissions', authMiddleware, (req, res) => {
  const userId = req.user.userId;
  const userSubmissions = submissions.filter(s => s.userId === userId);
  
  res.json({
    submissions: userSubmissions,
    total: userSubmissions.length
  });
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
  console.log(`📚 Health: http://localhost:${PORT}/api/health`);
  console.log(`📚 Problems: http://localhost:${PORT}/api/problems`);
  console.log(`🔐 Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/api/auth/login`);
});