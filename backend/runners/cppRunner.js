import { exec } from "child_process";
import fs from "fs";
import path from "path";

const TIME_LIMIT = 1000;

export function runCPP(code, testCase) {
  return new Promise((resolve, reject) => {
    const base = path.join(process.cwd(), "temp_cpp");
    const cppFile = `${base}.cpp`;
    const exe = `${base}.out`;

    const wrappedCode = `
#include <bits/stdc++.h>
using namespace std;

${code}

int main() {
  vector<int> nums = {${testCase.input.nums.join(",")}};
  int target = ${testCase.input.target};

  vector<int> res = twoSum(nums, target);

  cout << "[";
  for (int i = 0; i < res.size(); i++) {
    cout << res[i];
    if (i + 1 < res.size()) cout << ",";
  }
  cout << "]";
}
`;

    fs.writeFileSync(cppFile, wrappedCode);

    exec(`g++ ${cppFile} -o ${exe}`, (compileErr) => {
      if (compileErr) return reject(compileErr.message);

      exec(exe, { timeout: TIME_LIMIT }, (runErr, stdout, stderr) => {
        fs.unlinkSync(cppFile);
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

