import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/submissions/:problemId
router.get("/:problemId", async (req, res) => {
  const userId = 1; // TEMP
  const problemId = Number(req.params.problemId);

  const submissions = await prisma.submission.findMany({
    where: { userId, problemId },
    orderBy: { createdAt: "desc" }
  });

  res.json(submissions);
});

export default router;
