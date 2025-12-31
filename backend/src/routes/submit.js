import express from "express";
import { PrismaClient } from "@prisma/client";

import { runPythonDocker } from "../../runners/docker/pythonDockerRunner.js";
import { runCDocker } from "../../runners/docker/cDockerRunner.js";
import { runCPPDocker } from "../../runners/docker/cppDockerRunner.js";
import { runJSDocker } from "../../runners/docker/jsDockerRunner.js";

const router = express.Router();
const prisma = new PrismaClient();

/* -------------------------------
   Language selector
-------------------------------- */
function getRunner(language) {
  switch (language) {
    case "js": return runJSDocker;
    case "python": return runPythonDocker;
    case "c": return runCDocker;
    case "cpp": return runCPPDocker;
    default:
      throw new Error("Unsupported language");
  }
}

/* -------------------------------
   Normalize output (FINAL)
-------------------------------- */
function normalize(value) {
  // If already an array (from DB)
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  // If string output from runner
  if (typeof value === "string") {
    try {
      // Case: "[0,1]"
      return JSON.stringify(JSON.parse(value));
    } catch {
      // Case: "0,1"
      return JSON.stringify(
        value
          .replace(/[\[\]\s]/g, "")
          .split(",")
          .map(Number)
      );
    }
  }

  // Fallback
  return JSON.stringify(value);
}

/* -------------------------------
   POST /api/submit
-------------------------------- */
router.post("/", async (req, res) => {
  const { problemId, language, code } = req.body;

  // TEMP until auth middleware
  const userId = 1;

  try {
    const problem = await prisma.problem.findUnique({
      where: { id: problemId }
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    const runner = getRunner(language);
    const start = Date.now();

    for (let i = 0; i < problem.testCases.length; i++) {
      const testCase = problem.testCases[i];

      let output;
      try {
        output = await runner(code, testCase);
      } catch (err) {
        const executionMs = Date.now() - start;
        const status = err.toString().includes("Time Limit")
          ? "Time Limit Exceeded"
          : "Runtime Error";

        await prisma.submission.create({
          data: {
            userId,
            problemId,
            language,
            code,
            status,
            output: err.toString(),
            executionMs
          }
        });

        return res.json({ status });
      }

      const expected = normalize(testCase.output);
      const received = normalize(output);

      if (expected !== received) {
        const executionMs = Date.now() - start;

        await prisma.submission.create({
          data: {
            userId,
            problemId,
            language,
            code,
            status: "Wrong Answer",
            output: received,
            executionMs
          }
        });

        return res.json({
          status: "Wrong Answer",
          failedTestCase: i + 1,
          expected,
          received
        });
      }
    }

    // ✅ All test cases passed
    const executionMs = Date.now() - start;

    await prisma.submission.create({
      data: {
        userId,
        problemId,
        language,
        code,
        status: "Accepted",
        output: "All test cases passed",
        executionMs
      }
    });

    return res.json({
      status: "Accepted",
      executionMs
    });

  } catch (err) {
    return res.json({
      status: "Runtime Error",
      error: err.toString()
    });
  }
});

export default router;


