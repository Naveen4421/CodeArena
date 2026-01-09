// src/utils/constants.js
export const DIFFICULTIES = [
  { value: 'All', label: 'All Difficulty' },
  { value: 'Easy', label: 'Easy' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Hard', label: 'Hard' }
];

export const CATEGORIES = [
  { value: 'All', label: 'All Categories' },
  { value: 'Array', label: 'Array' },
  { value: 'String', label: 'String' },
  { value: 'Linked List', label: 'Linked List' },
  { value: 'Tree', label: 'Tree' },
  { value: 'Graph', label: 'Graph' },
  { value: 'Dynamic Programming', label: 'Dynamic Programming' },
  { value: 'Backtracking', label: 'Backtracking' },
  { value: 'Math', label: 'Math' },
  { value: 'Sorting', label: 'Sorting' },
  { value: 'Greedy', label: 'Greedy' },
  { value: 'Database', label: 'Database' }
];

export const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', extension: 'js' },
  { value: 'python', label: 'Python', extension: 'py' },
  { value: 'java', label: 'Java', extension: 'java' },
  { value: 'cpp', label: 'C++', extension: 'cpp' }
];

export const SUBMISSION_STATUS = {
  PENDING: 'Pending',
  RUNNING: 'Running',
  ACCEPTED: 'Accepted',
  WRONG_ANSWER: 'Wrong Answer',
  TIME_LIMIT_EXCEEDED: 'Time Limit Exceeded',
  RUNTIME_ERROR: 'Runtime Error',
  COMPILATION_ERROR: 'Compilation Error'
};

export const SUBMISSION_STATUS_COLORS = {
  [SUBMISSION_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [SUBMISSION_STATUS.RUNNING]: 'bg-blue-100 text-blue-800',
  [SUBMISSION_STATUS.ACCEPTED]: 'bg-green-100 text-green-800',
  [SUBMISSION_STATUS.WRONG_ANSWER]: 'bg-red-100 text-red-800',
  [SUBMISSION_STATUS.TIME_LIMIT_EXCEEDED]: 'bg-orange-100 text-orange-800',
  [SUBMISSION_STATUS.RUNTIME_ERROR]: 'bg-red-100 text-red-800',
  [SUBMISSION_STATUS.COMPILATION_ERROR]: 'bg-red-100 text-red-800'
};