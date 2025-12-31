import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export function runPythonDocker(code, testCase) {
  return new Promise((resolve, reject) => {
    const jobId = uuid();
    const jobDir = path.join("/tmp", jobId);
    fs.mkdirSync(jobDir);

    const filePath = path.join(jobDir, "solution.py");

    const wrappedCode = `
${code}

nums = ${JSON.stringify(testCase.input.nums)}
target = ${testCase.input.target}

print(twoSum(nums, target))
`;

    fs.writeFileSync(filePath, wrappedCode);

    const cmd = `
docker run --rm \
--memory=128m \
--cpus=0.5 \
--pids-limit=64 \
-v ${jobDir}:/app \
python:3.10 \
python /app/solution.py
`;

    exec(cmd, { timeout: 2000 }, (err, stdout, stderr) => {
      fs.rmSync(jobDir, { recursive: true, force: true });

      if (err) return reject(stderr || "Time Limit Exceeded");
      resolve(stdout.trim());
    });
  });
}
