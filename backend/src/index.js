import dotenv from 'dotenv';
dotenv.config(); // 👈 MUST be first

import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import submitRoutes from './routes/submit.js';
import submissionHistoryRoutes from './routes/submissions.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/submit', submitRoutes);
app.use('/api/submissions', submissionHistoryRoutes);

app.get('/', (req, res) => {
  res.send("Coding Platform Backend Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

