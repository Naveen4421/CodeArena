import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const TIME_LIMIT = 2000; // ms

export function runJSDocker(code, testCase) {
  return new Promise((resolve, reject) => {
    const jobId = uuid();
    const jobDir = path.join("/tmp", jobId);
    fs.mkdirSync(jobDir);

    const filePath = path.join(jobDir, "solution.js");

    const wrappedCode = `
${code}

const nums = ${JSON.stringify(testCase.input.nums)};
const target = ${testCase.input.target};

console.log(JSON.stringify(twoSum(nums, target)));
`;

    fs.writeFileSync(filePath, wrappedCode);

    const cmd = `
docker run --rm \
  -v ${jobDir}:/app \
  node:20 \
  node /app/solution.js
`;

    exec(cmd, { timeout: TIME_LIMIT }, (err, stdout, stderr) => {
      fs.rmSync(jobDir, { recursive: true, force: true });

      if (err) {
        if (err.killed) {
          return reject({ type: "TLE" });
        }
        return reject(stderr || err.message);
      }

      resolve(stdout.trim());
    });
  });
}

