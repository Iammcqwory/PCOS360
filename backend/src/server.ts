import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import onboardingRoutes from './routes/onboarding';
import dashboardRoutes from './routes/dashboard';
import aiRoutes from './routes/ai';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/onboarding', onboardingRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/ai', aiRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'PCOS360 backend is running.' });
});

app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
