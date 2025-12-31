import { exec } from "child_process";
import fs from "fs";
import path from "path";

const TIME_LIMIT = 2000;

export function runPython(code, testCase) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), "temp.py");

    const wrappedCode = `
${code}

nums = ${JSON.stringify(testCase.input.nums)}
target = ${testCase.input.target}
print(twoSum(nums, target))
`;

    fs.writeFileSync(filePath, wrappedCode);

    exec(`python3 ${filePath}`, { timeout: TIME_LIMIT }, (err, stdout, stderr) => {
      fs.unlinkSync(filePath);

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

