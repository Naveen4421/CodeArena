import { exec } from "child_process";
import fs from "fs";
import path from "path";

export function runJS(code, testCase) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(process.cwd(), "temp.js");

    // Spread input array as arguments
    const wrappedCode = `
${code}

const result = twoSum(...${JSON.stringify(testCase.input)});
console.log(JSON.stringify(result));
`;

    fs.writeFileSync(filePath, wrappedCode);

    exec(`node ${filePath}`, (err, stdout, stderr) => {
      fs.unlinkSync(filePath);

      if (err || stderr) {
        return reject(stderr || err.message);
      }

      resolve(stdout.trim());
    });
  });
}

