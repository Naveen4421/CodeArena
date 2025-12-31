import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export function runCPPDocker(code, testCase) {
  return new Promise((resolve, reject) => {
    const jobId = uuid();
    const jobDir = path.join("/tmp", jobId);
    fs.mkdirSync(jobDir);

    const cppFile = path.join(jobDir, "solution.cpp");

    const wrappedCode = `
#include <bits/stdc++.h>
using namespace std;

${code}

int main() {
  vector<int> nums = {${testCase.input.nums.join(",")}};
  int target = ${testCase.input.target};

  vector<int> res = twoSum(nums, target);

  cout << "[" << res[0] << "," << res[1] << "]";
}
`;

    fs.writeFileSync(cppFile, wrappedCode);

    const cmd = `
docker run --rm \
--memory=128m \
--cpus=0.5 \
-v ${jobDir}:/app \
gcc:13 \
bash -c "g++ /app/solution.cpp -o /app/a.out && /app/a.out"
`;

    exec(cmd, { timeout: 2000 }, (err, stdout, stderr) => {
      fs.rmSync(jobDir, { recursive: true, force: true });

      if (err) return reject(stderr || "Time Limit Exceeded");
      resolve(stdout.trim());
    });
  });
}
