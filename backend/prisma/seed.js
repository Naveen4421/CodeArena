import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

await prisma.problem.update({
  where: { id: 1 },
  data: {
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, output: [0,1] },
      { input: { nums: [3,2,4], target: 6 }, output: [1,2] }
    ]
  }
});

console.log("Test cases updated");
