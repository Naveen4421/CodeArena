// routes/problems.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Helper function to calculate acceptance rate
async function getProblemsWithStats(filter, skip, take, sortBy, order) {
    // Get problems with their submission stats in one query
    const problems = await prisma.problem.findMany({
        where: filter,
        select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            category: true,
            likes: true,
            dislikes: true,
            createdAt: true,
            submissions: {
                select: {
                    status: true
                }
            }
        },
        orderBy: { [sortBy]: order },
        skip,
        take
    });

    // Transform data with acceptance rate
    return problems.map(problem => {
        const totalSubmissions = problem.submissions.length;
        const acceptedSubmissions = problem.submissions.filter(s => s.status === 'Accepted').length;
        const acceptanceRate = totalSubmissions > 0 
            ? Math.round((acceptedSubmissions / totalSubmissions) * 100) 
            : 0;

        // Remove submissions array from response
        const { submissions, ...problemData } = problem;
        
        return {
            ...problemData,
            totalSubmissions,
            acceptanceRate,
            _count: { submissions: totalSubmissions }
        };
    });
}

// GET all problems (with pagination and filtering)
router.get('/', async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 20, 
            difficulty, 
            category, 
            search,
            sortBy = 'createdAt',
            order = 'desc' 
        } = req.query;
        
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;
        
        // Validate inputs
        if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
            return res.status(400).json({ 
                error: 'Invalid pagination parameters' 
            });
        }
        
        // Build filter
        const filter = {};
        
        if (difficulty && difficulty !== 'All') {
            filter.difficulty = difficulty;
        }
        
        if (category && category !== 'All') {
            filter.category = category;
        }
        
        if (search) {
            filter.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }
        
        // Execute queries in parallel
        const [problems, total, difficulties, categories] = await Promise.all([
            getProblemsWithStats(filter, skip, limitNum, sortBy, order),
            prisma.problem.count({ where: filter }),
            prisma.problem.findMany({
                distinct: ['difficulty'],
                select: { difficulty: true },
                orderBy: { difficulty: 'asc' }
            }),
            prisma.problem.findMany({
                distinct: ['category'],
                select: { category: true },
                orderBy: { category: 'asc' }
            })
        ]);
        
        res.json({
            problems,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalProblems: total,
                hasNextPage: pageNum * limitNum < total,
                hasPrevPage: pageNum > 1
            },
            filters: {
                availableDifficulties: difficulties.map(d => d.difficulty),
                availableCategories: categories.map(c => c.category)
            }
        });
        
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).json({ 
            error: 'Failed to fetch problems',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// GET single problem by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        
        const problem = await prisma.problem.findUnique({
            where: { slug },
            include: {
                _count: {
                    select: { 
                        submissions: true,
                        submissions: {
                            where: { status: 'Accepted' }
                        }
                    }
                }
            }
        });
        
        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }
        
        // Calculate acceptance rate
        const totalSubmissions = problem._count.submissions;
        const acceptedSubmissions = problem._count.submissions;
        const acceptanceRate = totalSubmissions > 0 
            ? Math.round((acceptedSubmissions / totalSubmissions) * 100) 
            : 0;
        
        // Don't send hidden cases to regular users
        const { hiddenCases, ...problemData } = problem;
        
        res.json({
            ...problemData,
            acceptanceRate,
            totalSubmissions
        });
        
    } catch (error) {
        console.error('Error fetching problem:', error);
        res.status(500).json({ 
            error: 'Failed to fetch problem',
            message: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// GET problem count by difficulty (for stats)
router.get('/stats/count', async (req, res) => {
    try {
        const stats = await prisma.problem.groupBy({
            by: ['difficulty'],
            _count: {
                id: true
            }
        });
        
        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET random problem
router.get('/random', async (req, res) => {
    try {
        const { difficulty, category } = req.query;
        
        const filter = {};
        if (difficulty && difficulty !== 'All') {
            filter.difficulty = difficulty;
        }
        if (category && category !== 'All') {
            filter.category = category;
        }
        
        // Get total count
        const total = await prisma.problem.count({ where: filter });
        
        if (total === 0) {
            return res.status(404).json({ error: 'No problems found with given filters' });
        }
        
        // Get random skip
        const randomSkip = Math.floor(Math.random() * total);
        
        // Get random problem
        const randomProblem = await prisma.problem.findFirst({
            where: filter,
            skip: randomSkip,
            select: {
                id: true,
                title: true,
                slug: true,
                difficulty: true,
                category: true
            }
        });
        
        res.json(randomProblem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
