// middleware/adminAuth.js
const adminAuth = async (req, res, next) => {
    try {
        const userId = req.userId; // From JWT middleware
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ error: 'Admin access required' });
        }
        
        req.adminId = userId;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Authentication error' });
    }
};

// routes/admin.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Apply admin auth to all routes
router.use(adminAuth);

// GET all problems (admin view with all data)
router.get('/problems', async (req, res) => {
    try {
        const problems = await prisma.problem.findMany({
            include: {
                _count: {
                    select: { submissions: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST create new problem
router.post('/problems', async (req, res) => {
    try {
        const {
            title,
            slug,
            description,
            difficulty,
            category,
            hints,
            constraints,
            examples,
            starterCode,
            testCases,
            hiddenCases
        } = req.body;

        // Generate slug if not provided
        const problemSlug = slug || title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');

        // Create problem
        const problem = await prisma.problem.create({
            data: {
                title,
                slug: problemSlug,
                description,
                difficulty,
                category,
                hints: hints || [],
                constraints: constraints || [],
                examples: examples || [],
                starterCode: starterCode || {},
                testCases: testCases || [],
                hiddenCases: hiddenCases || null
            }
        });

        // Log admin action
        await prisma.adminLog.create({
            data: {
                adminId: req.adminId,
                action: 'create_problem',
                target: problem.title,
                details: { problemId: problem.id }
            }
        });

        res.json({ success: true, problem });
    } catch (error) {
        if (error.code === 'P2002') {
            res.status(400).json({ error: 'Problem with this title or slug already exists' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

// PUT update problem
router.put('/problems/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // If updating slug, ensure uniqueness
        if (updateData.slug) {
            const existing = await prisma.problem.findFirst({
                where: {
                    slug: updateData.slug,
                    NOT: { id: parseInt(id) }
                }
            });
            if (existing) {
                return res.status(400).json({ error: 'Slug already taken' });
            }
        }

        const problem = await prisma.problem.update({
            where: { id: parseInt(id) },
            data: updateData
        });

        // Log action
        await prisma.adminLog.create({
            data: {
                adminId: req.adminId,
                action: 'update_problem',
                target: problem.title,
                details: { problemId: problem.id, changes: updateData }
            }
        });

        res.json({ success: true, problem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE problem
router.delete('/problems/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get problem info before deletion for logging
        const problem = await prisma.problem.findUnique({
            where: { id: parseInt(id) }
        });

        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        // Delete related submissions first (due to foreign key)
        await prisma.submission.deleteMany({
            where: { problemId: parseInt(id) }
        });

        // Delete problem
        await prisma.problem.delete({
            where: { id: parseInt(id) }
        });

        // Log action
        await prisma.adminLog.create({
            data: {
                adminId: req.adminId,
                action: 'delete_problem',
                target: problem.title,
                details: { problemId: problem.id }
            }
        });

        res.json({ success: true, message: 'Problem deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET problem statistics
router.get('/stats', async (req, res) => {
    try {
        const [
            totalProblems,
            totalSubmissions,
            totalUsers,
            recentSubmissions
        ] = await Promise.all([
            prisma.problem.count(),
            prisma.submission.count(),
            prisma.user.count(),
            prisma.submission.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: {
                    user: { select: { username: true } },
                    problem: { select: { title: true } }
                }
            })
        ]);

        // Problem difficulty distribution
        const difficultyStats = await prisma.problem.groupBy({
            by: ['difficulty'],
            _count: { id: true }
        });

        // Submission status distribution
        const statusStats = await prisma.submission.groupBy({
            by: ['status'],
            _count: { id: true }
        });

        res.json({
            totalProblems,
            totalSubmissions,
            totalUsers,
            difficultyStats,
            statusStats,
            recentSubmissions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
