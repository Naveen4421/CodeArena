import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.problem.update({
    where: { id: 1 },
    data: {
      testCases: [
        { input: "[2,7,11,15],9", output: "[0,1]" },
        { input: "[3,2,4],6", output: "[1,2]" }
      ]
    }
  });

  console.log("Test cases updated");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
