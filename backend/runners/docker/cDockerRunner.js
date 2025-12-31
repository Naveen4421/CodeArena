import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

export function runCDocker(code, testCase) {
  return new Promise((resolve, reject) => {
    const jobId = uuid();
    const jobDir = path.join("/tmp", jobId);
    fs.mkdirSync(jobDir);

    const cFile = path.join(jobDir, "solution.c");

    const wrappedCode = `
#include <stdio.h>
#include <stdlib.h>

${code}

int main() {
  int nums[] = {${testCase.input.nums.join(",")}};
  int target = ${testCase.input.target};
  int returnSize;

  int* res = twoSum(nums, ${testCase.input.nums.length}, target, &returnSize);

  printf("[");
  for (int i = 0; i < returnSize; i++) {
    printf("%d", res[i]);
    if (i < returnSize - 1) printf(",");
  }
  printf("]");
}
`;

    fs.writeFileSync(cFile, wrappedCode);

    const cmd = `
docker run --rm \
--memory=128m \
--cpus=0.5 \
-v ${jobDir}:/app \
gcc:13 \
bash -c "gcc /app/solution.c -o /app/a.out && /app/a.out"
`;

    exec(cmd, { timeout: 2000 }, (err, stdout, stderr) => {
      fs.rmSync(jobDir, { recursive: true, force: true });

      if (err) return reject(stderr || "Time Limit Exceeded");
      resolve(stdout.trim());
    });
  });
}
