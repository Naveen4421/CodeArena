import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a single example problem
  await prisma.problem.create({
    data: {
      title: "Two Sum",
      description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
      difficulty: "Easy",
      examples: [
        {
          input: "[2,7,11,15], target=9",
          output: "[0,1]"
        }
      ],
      testCases: [
        {
          input: "[2,7,11,15], 9",
          output: "[0,1]"
        }
      ]
    }
  });

  console.log("Problem added successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
