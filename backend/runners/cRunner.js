import { exec } from "child_process";
import fs from "fs";
import path from "path";

const TIME_LIMIT = 1000;

export function runC(code, testCase) {
  return new Promise((resolve, reject) => {
    const base = path.join(process.cwd(), "temp_c");
    const cFile = `${base}.c`;
    const exe = `${base}.out`;

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

    exec(`gcc ${cFile} -o ${exe}`, (compileErr) => {
      if (compileErr) return reject(compileErr.message);

      exec(exe, { timeout: TIME_LIMIT }, (runErr, stdout, stderr) => {
        fs.unlinkSync(cFile);
        fs.unlinkSync(exe);

        if (runErr) {
          if (runErr.killed) return reject({ type: "TLE" });
          return reject(stderr || runErr.message);
        }

        resolve(stdout.trim());
      });
    });
  });
}

