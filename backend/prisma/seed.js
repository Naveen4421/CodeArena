const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

const problems = [
  // Your existing problems remain the same...
  // Adding 15 more popular problems
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    description: `Given a string s, find the length of the longest substring without repeating characters.`,
    difficulty: "Medium",
    category: "String",
    hints: [
      "Use a sliding window approach with two pointers.",
      "Use a hash map to store the last index of each character."
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    examples: [
      {
        input: { s: "abcabcbb" },
        output: 3,
        explanation: "The answer is 'abc', with the length of 3."
      },
      {
        input: { s: "bbbbb" },
        output: 1,
        explanation: "The answer is 'b', with the length of 1."
      },
      {
        input: { s: "pwwkew" },
        output: 3,
        explanation: "The answer is 'wke', with the length of 3."
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    // Write your code here
    
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { s: "abcabcbb" }, output: 3 },
      { input: { s: "bbbbb" }, output: 1 },
      { input: { s: "pwwkew" }, output: 3 },
      { input: { s: "" }, output: 0 }
    ],
    hiddenCases: [
      { input: { s: " " }, output: 1 },
      { input: { s: "dvdf" }, output: 3 },
      { input: { s: "abba" }, output: 2 },
      { input: { s: "tmmzuxt" }, output: 5 }
    ]
  },
  {
    title: "Container With Most Water",
    slug: "container-with-most-water",
    description: `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.`,
    difficulty: "Medium",
    category: "Array",
    hints: [
      "Use two pointers starting from both ends.",
      "Move the pointer pointing to the shorter line inward."
    ],
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    examples: [
      {
        input: { height: [1,8,6,2,5,4,8,3,7] },
        output: 49,
        explanation: "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. The max area is 49."
      },
      {
        input: { height: [1,1] },
        output: 1,
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // Write your code here
    
};`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        # Write your code here`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int maxArea(int[] height) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { height: [1,8,6,2,5,4,8,3,7] }, output: 49 },
      { input: { height: [1,1] }, output: 1 }
    ],
    hiddenCases: [
      { input: { height: [4,3,2,1,4] }, output: 16 },
      { input: { height: [1,2,1] }, output: 2 },
      { input: { height: [2,3,4,5,18,17,6] }, output: 17 }
    ]
  },
  {
    title: "3Sum",
    slug: "3sum",
    description: `Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.`,
    difficulty: "Medium",
    category: "Array",
    hints: [
      "Sort the array first.",
      "For each element, use two pointers to find pairs that sum to -element."
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    examples: [
      {
        input: { nums: [-1,0,1,2,-1,-4] },
        output: [[-1,-1,2],[-1,0,1]],
        explanation: null
      },
      {
        input: { nums: [0,1,1] },
        output: [],
        explanation: null
      },
      {
        input: { nums: [0,0,0] },
        output: [[0,0,0]],
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    // Write your code here
    
};`,
      python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        # Write your code here`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { nums: [-1,0,1,2,-1,-4] }, output: [[-1,-1,2],[-1,0,1]] },
      { input: { nums: [0,1,1] }, output: [] },
      { input: { nums: [0,0,0] }, output: [[0,0,0]] }
    ],
    hiddenCases: [
      { input: { nums: [0,0,0,0] }, output: [[0,0,0]] },
      { input: { nums: [-2,0,1,1,2] }, output: [[-2,0,2],[-2,1,1]] },
      { input: { nums: [-1,0,1,2,-1,-4,-2,-3,3,0,4] }, output: [[-4,0,4],[-4,1,3],[-3,-1,4],[-3,0,3],[-3,1,2],[-2,-1,3],[-2,0,2],[-1,-1,2],[-1,0,1]] }
    ]
  },
  {
    title: "Remove Nth Node From End of List",
    slug: "remove-nth-node-from-end-of-list",
    description: `Given the head of a linked list, remove the nth node from the end of the list and return its head.`,
    difficulty: "Medium",
    category: "Linked List",
    hints: [
      "Use two pointers with a gap of n nodes between them.",
      "When the fast pointer reaches the end, the slow pointer will be at the node to remove."
    ],
    constraints: [
      "The number of nodes in the list is sz.",
      "1 <= sz <= 30",
      "0 <= Node.val <= 100",
      "1 <= n <= sz"
    ],
    examples: [
      {
        input: { head: [1,2,3,4,5], n: 2 },
        output: [1,2,3,5],
        explanation: null
      },
      {
        input: { head: [1], n: 1 },
        output: [],
        explanation: null
      },
      {
        input: { head: [1,2], n: 1 },
        output: [1],
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    // Write your code here
    
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # Write your code here`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        // Write your code here
    }
};`,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { head: [1,2,3,4,5], n: 2 }, output: [1,2,3,5] },
      { input: { head: [1], n: 1 }, output: [] },
      { input: { head: [1,2], n: 1 }, output: [1] }
    ],
    hiddenCases: [
      { input: { head: [1,2,3], n: 3 }, output: [2,3] },
      { input: { head: [1,2,3,4,5], n: 5 }, output: [2,3,4,5] },
      { input: { head: [1,2,3,4,5,6,7,8,9,10], n: 7 }, output: [1,2,3,5,6,7,8,9,10] }
    ]
  },
  {
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    description: `There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].

Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 otherwise.

You must write an algorithm with O(log n) runtime complexity.`,
    difficulty: "Medium",
    category: "Array",
    hints: [
      "Use modified binary search.",
      "Find which half of the array is sorted and check if target lies in that half."
    ],
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-10^4 <= target <= 10^4"
    ],
    examples: [
      {
        input: { nums: [4,5,6,7,0,1,2], target: 0 },
        output: 4,
        explanation: null
      },
      {
        input: { nums: [4,5,6,7,0,1,2], target: 3 },
        output: -1,
        explanation: null
      },
      {
        input: { nums: [1], target: 0 },
        output: -1,
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // Write your code here
    
};`,
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        # Write your code here`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { nums: [4,5,6,7,0,1,2], target: 0 }, output: 4 },
      { input: { nums: [4,5,6,7,0,1,2], target: 3 }, output: -1 },
      { input: { nums: [1], target: 0 }, output: -1 }
    ],
    hiddenCases: [
      { input: { nums: [1], target: 1 }, output: 0 },
      { input: { nums: [3,1], target: 1 }, output: 1 },
      { input: { nums: [5,1,3], target: 5 }, output: 0 },
      { input: { nums: [4,5,6,7,0,1,2], target: 5 }, output: 1 }
    ]
  },
  {
    title: "Combination Sum",
    slug: "combination-sum",
    description: `Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.`,
    difficulty: "Medium",
    category: "Backtracking",
    hints: [
      "Use backtracking/DFS.",
      "Sort candidates first to help with pruning.",
      "Consider using recursion with an index parameter to avoid duplicates."
    ],
    constraints: [
      "1 <= candidates.length <= 30",
      "2 <= candidates[i] <= 40",
      "All elements of candidates are distinct.",
      "1 <= target <= 500"
    ],
    examples: [
      {
        input: { candidates: [2,3,6,7], target: 7 },
        output: [[2,2,3],[7]],
        explanation: "2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times. 7 is a candidate, and 7 = 7. These are the only two combinations."
      },
      {
        input: { candidates: [2,3,5], target: 8 },
        output: [[2,2,2,2],[2,3,3],[3,5]],
        explanation: null
      },
      {
        input: { candidates: [2], target: 1 },
        output: [],
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    // Write your code here
    
};`,
      python: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        # Write your code here`,
      cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { candidates: [2,3,6,7], target: 7 }, output: [[2,2,3],[7]] },
      { input: { candidates: [2,3,5], target: 8 }, output: [[2,2,2,2],[2,3,3],[3,5]] },
      { input: { candidates: [2], target: 1 }, output: [] }
    ],
    hiddenCases: [
      { input: { candidates: [2], target: 2 }, output: [[2]] },
      { input: { candidates: [3,5,8], target: 11 }, output: [[3,3,5],[3,8]] },
      { input: { candidates: [2,4,6,8], target: 10 }, output: [[2,2,2,2,2],[2,2,2,4],[2,2,6],[2,4,4],[2,8],[4,6]] }
    ]
  },
  {
    title: "Rotate Image",
    slug: "rotate-image",
    description: `You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.`,
    difficulty: "Medium",
    category: "Matrix",
    hints: [
      "Transpose the matrix first.",
      "Then reverse each row."
    ],
    constraints: [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    examples: [
      {
        input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
        output: [[7,4,1],[8,5,2],[9,6,3]],
        explanation: null
      },
      {
        input: { matrix: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] },
        output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]],
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    // Write your code here
    
};`,
      python: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # Write your code here`,
      cpp: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public void rotate(int[][] matrix) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] }, output: [[7,4,1],[8,5,2],[9,6,3]] },
      { input: { matrix: [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] }, output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]] }
    ],
    hiddenCases: [
      { input: { matrix: [[1]] }, output: [[1]] },
      { input: { matrix: [[1,2],[3,4]] }, output: [[3,1],[4,2]] }
    ]
  },
  {
    title: "Group Anagrams",
    slug: "group-anagrams",
    description: `Given an array of strings strs, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    difficulty: "Medium",
    category: "String",
    hints: [
      "Use a hash map where the key is the sorted version of each string.",
      "All anagrams will have the same sorted string."
    ],
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    examples: [
      {
        input: { strs: ["eat","tea","tan","ate","nat","bat"] },
        output: [["bat"],["nat","tan"],["ate","eat","tea"]],
        explanation: null
      },
      {
        input: { strs: [""] },
        output: [[""]],
        explanation: null
      },
      {
        input: { strs: ["a"] },
        output: [["a"]],
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    // Write your code here
    
};`,
      python: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        # Write your code here`,
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { strs: ["eat","tea","tan","ate","nat","bat"] }, output: [["bat"],["nat","tan"],["ate","eat","tea"]] },
      { input: { strs: [""] }, output: [[""]] },
      { input: { strs: ["a"] }, output: [["a"]] }
    ],
    hiddenCases: [
      { input: { strs: ["abc","bca","cab","def","fed","xyz","zyx"] }, output: [["abc","bca","cab"],["def","fed"],["xyz","zyx"]] },
      { input: { strs: ["a","b","c","d"] }, output: [["a"],["b"],["c"],["d"]] }
    ]
  },
  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description: `Given an integer array nums, find the subarray with the largest sum, and return its sum.`,
    difficulty: "Medium",
    category: "Dynamic Programming",
    hints: [
      "Use Kadane's algorithm.",
      "Keep track of current sum and maximum sum."
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    examples: [
      {
        input: { nums: [-2,1,-3,4,-1,2,1,-5,4] },
        output: 6,
        explanation: "The subarray [4,-1,2,1] has the largest sum 6."
      },
      {
        input: { nums: [1] },
        output: 1,
        explanation: null
      },
      {
        input: { nums: [5,4,-1,7,8] },
        output: 23,
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // Write your code here
    
};`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # Write your code here`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { nums: [-2,1,-3,4,-1,2,1,-5,4] }, output: 6 },
      { input: { nums: [1] }, output: 1 },
      { input: { nums: [5,4,-1,7,8] }, output: 23 }
    ],
    hiddenCases: [
      { input: { nums: [-1] }, output: -1 },
      { input: { nums: [-2,-1] }, output: -1 },
      { input: { nums: [1,2,3,4,5] }, output: 15 },
      { input: { nums: [1,-2,3,-4,5] }, output: 5 }
    ]
  },
  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    description: `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    difficulty: "Medium",
    category: "Intervals",
    hints: [
      "Sort intervals by start time.",
      "Iterate through intervals and merge if they overlap."
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= starti <= endi <= 10^4"
    ],
    examples: [
      {
        input: { intervals: [[1,3],[2,6],[8,10],[15,18]] },
        output: [[1,6],[8,10],[15,18]],
        explanation: "Since intervals [1,3] and [2,6] overlap, merge them into [1,6]."
      },
      {
        input: { intervals: [[1,4],[4,5]] },
        output: [[1,5]],
        explanation: "Intervals [1,4] and [4,5] are considered overlapping."
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    // Write your code here
    
};`,
      python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Write your code here`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { intervals: [[1,3],[2,6],[8,10],[15,18]] }, output: [[1,6],[8,10],[15,18]] },
      { input: { intervals: [[1,4],[4,5]] }, output: [[1,5]] }
    ],
    hiddenCases: [
      { input: { intervals: [[1,4],[0,4]] }, output: [[0,4]] },
      { input: { intervals: [[1,4],[0,1]] }, output: [[0,4]] },
      { input: { intervals: [[1,4],[0,0]] }, output: [[0,0],[1,4]] },
      { input: { intervals: [[1,4],[2,3]] }, output: [[1,4]] }
    ]
  },
  {
    title: "Unique Paths",
    slug: "unique-paths",
    description: `There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

Given the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The test cases are generated so that the answer will be less than or equal to 2 * 10^9.`,
    difficulty: "Medium",
    category: "Dynamic Programming",
    hints: [
      "Use dynamic programming with dp[i][j] = dp[i-1][j] + dp[i][j-1].",
      "Alternatively, use combinatorics: C(m+n-2, m-1)."
    ],
    constraints: [
      "1 <= m, n <= 100"
    ],
    examples: [
      {
        input: { m: 3, n: 7 },
        output: 28,
        explanation: null
      },
      {
        input: { m: 3, n: 2 },
        output: 3,
        explanation: "From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:\n1. Right -> Down -> Down\n2. Down -> Down -> Right\n3. Down -> Right -> Down"
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    // Write your code here
    
};`,
      python: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # Write your code here`,
      cpp: `class Solution {
public:
    int uniquePaths(int m, int n) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int uniquePaths(int m, int n) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { m: 3, n: 7 }, output: 28 },
      { input: { m: 3, n: 2 }, output: 3 }
    ],
    hiddenCases: [
      { input: { m: 1, n: 1 }, output: 1 },
      { input: { m: 1, n: 10 }, output: 1 },
      { input: { m: 10, n: 1 }, output: 1 },
      { input: { m: 7, n: 3 }, output: 28 }
    ]
  },
  {
    title: "Set Matrix Zeroes",
    slug: "set-matrix-zeroes",
    description: `Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.`,
    difficulty: "Medium",
    category: "Matrix",
    hints: [
      "Use first row and first column as markers.",
      "Handle first row and first column separately."
    ],
    constraints: [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 <= m, n <= 200",
      "-2^31 <= matrix[i][j] <= 2^31 - 1"
    ],
    examples: [
      {
        input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] },
        output: [[1,0,1],[0,0,0],[1,0,1]],
        explanation: null
      },
      {
        input: { matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] },
        output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]],
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    // Write your code here
    
};`,
      python: `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # Write your code here`,
      cpp: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public void setZeroes(int[][] matrix) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] }, output: [[1,0,1],[0,0,0],[1,0,1]] },
      { input: { matrix: [[0,1,2,0],[3,4,5,2],[1,3,1,5]] }, output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]] }
    ],
    hiddenCases: [
      { input: { matrix: [[1]] }, output: [[1]] },
      { input: { matrix: [[0]] }, output: [[0]] },
      { input: { matrix: [[1,0],[1,1]] }, output: [[0,0],[1,0]] }
    ]
  },
  {
    title: "Word Search",
    slug: "word-search",
    description: `Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    difficulty: "Medium",
    category: "Backtracking",
    hints: [
      "Use backtracking/DFS.",
      "Mark visited cells to avoid reuse.",
      "Prune early when characters don't match."
    ],
    constraints: [
      "m == board.length",
      "n = board[i].length",
      "1 <= m, n <= 6",
      "1 <= word.length <= 15",
      "board and word consists of only lowercase and uppercase English letters."
    ],
    examples: [
      {
        input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCCED" },
        output: true,
        explanation: null
      },
      {
        input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "SEE" },
        output: true,
        explanation: null
      },
      {
        input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCB" },
        output: false,
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    // Write your code here
    
};`,
      python: `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        # Write your code here`,
      cpp: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public boolean exist(char[][] board, String word) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCCED" }, output: true },
      { input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "SEE" }, output: true },
      { input: { board: [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word: "ABCB" }, output: false }
    ],
    hiddenCases: [
      { input: { board: [["a"]], word: "a" }, output: true },
      { input: { board: [["a","b"],["c","d"]], word: "abcd" }, output: false },
      { input: { board: [["A","B","C","E"],["S","F","E","S"],["A","D","E","E"]], word: "ABCESEEEFS" }, output: true }
    ]
  },
  {
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    description: `Given a string s, return the longest palindromic substring in s.`,
    difficulty: "Medium",
    category: "String",
    hints: [
      "Expand around center for odd and even length palindromes.",
      "Alternatively, use dynamic programming."
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    examples: [
      {
        input: { s: "babad" },
        output: "bab",
        explanation: "Note: 'aba' is also a valid answer."
      },
      {
        input: { s: "cbbd" },
        output: "bb",
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    // Write your code here
    
};`,
      python: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        # Write your code here`,
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public String longestPalindrome(String s) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { s: "babad" }, output: "bab" },
      { input: { s: "cbbd" }, output: "bb" }
    ],
    hiddenCases: [
      { input: { s: "a" }, output: "a" },
      { input: { s: "ac" }, output: "a" },
      { input: { s: "racecar" }, output: "racecar" },
      { input: { s: "abcda" }, output: "a" }
    ]
  },
  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    description: `Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.`,
    difficulty: "Hard",
    category: "Array",
    hints: [
      "Use two pointers from both ends.",
      "Track left max and right max as you move pointers.",
      "Water at each position = min(leftMax, rightMax) - height[i]"
    ],
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    examples: [
      {
        input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] },
        output: 6,
        explanation: "The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped."
      },
      {
        input: { height: [4,2,0,3,2,5] },
        output: 9,
        explanation: null
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    // Write your code here
    
};`,
      python: `class Solution:
    def trap(self, height: List[int]) -> int:
        # Write your code here`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        // Write your code here
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        // Write your code here
    }
}`
    },
    testCases: [
      { input: { height: [0,1,0,2,1,0,1,3,2,1,2,1] }, output: 6 },
      { input: { height: [4,2,0,3,2,5] }, output: 9 }
    ],
    hiddenCases: [
      { input: { height: [0] }, output: 0 },
      { input: { height: [1,0,1] }, output: 1 },
      { input: { height: [5,4,3,2,1] }, output: 0 },
      { input: { height: [1,2,3,4,5] }, output: 0 }
    ]
  }
];

async function seed() {
  console.log('🚀 Seeding database...');
  
  try {
    // Clear existing data (optional - comment out in production)
    console.log('Cleaning existing data...');
    await prisma.submission.deleteMany({});
    await prisma.problem.deleteMany({});
    
    // Create admin user with hashed password
    console.log('Creating admin user...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
      where: { email: 'admin@codingplatform.com' },
      update: {
        role: 'admin',
        password: adminPassword
      },
      create: {
        email: 'admin@codingplatform.com',
        username: 'admin',
        password: adminPassword,
        role: 'admin'
      }
    });
    
    // Create test user
    console.log('Creating test user...');
    const testPassword = await bcrypt.hash('test123', 10);
    const testUser = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        username: 'testuser',
        password: testPassword,
        role: 'user'
      }
    });
    
    // Create problems
    console.log('Creating problems...');
    let createdCount = 0;
    
    for (const problemData of problems) {
      try {
        await prisma.problem.create({
          data: {
            title: problemData.title,
            slug: problemData.slug,
            description: problemData.description,
            difficulty: problemData.difficulty,
            category: problemData.category,
            hints: problemData.hints,
            constraints: problemData.constraints,
            examples: problemData.examples,
            starterCode: problemData.starterCode,
            testCases: problemData.testCases,
            hiddenCases: problemData.hiddenCases,
            likes: Math.floor(Math.random() * 100),
            dislikes: Math.floor(Math.random() * 20)
          }
        });
        createdCount++;
        console.log(`✅ Created: ${problemData.title} (${problemData.difficulty})`);
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`⚠️ Skipping (already exists): ${problemData.title}`);
        } else {
          console.error(`❌ Error creating ${problemData.title}:`, error.message);
        }
      }
    }
    
    // Create some sample submissions
    console.log('Creating sample submissions...');
    const allProblems = await prisma.problem.findMany({ take: 5 });
    
    const submissionStatuses = ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error'];
    const languages = ['javascript', 'python', 'cpp', 'java'];
    
    for (let i = 0; i < 20; i++) {
      const problem = allProblems[Math.floor(Math.random() * allProblems.length)];
      const status = submissionStatuses[Math.floor(Math.random() * submissionStatuses.length)];
      const language = languages[Math.floor(Math.random() * languages.length)];
      
      await prisma.submission.create({
        data: {
          userId: testUser.id,
          problemId: problem.id,
          language,
          code: problem.starterCode[language] || '// Sample code',
          status,
          runtime: status === 'Accepted' ? Math.floor(Math.random() * 100) + 10 : null,
          memory: status === 'Accepted' ? Math.floor(Math.random() * 10000) + 1000 : null,
          passedCases: status === 'Accepted' ? problem.testCases.length : Math.floor(Math.random() * problem.testCases.length),
          totalCases: problem.testCases.length,
          error: status !== 'Accepted' ? 'Some error occurred' : null
        }
      });
    }
    
    console.log('\n🎉 Seeding completed!');
    console.log(`📊 Summary:`);
    console.log(`   Problems created: ${createdCount}`);
    console.log(`   Admin user: ${admin.email} (password: admin123)`);
    console.log(`   Test user: ${testUser.email} (password: test123)`);
    console.log(`   Sample submissions: 20`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seed();
}

module.exports = { problems, seed };
