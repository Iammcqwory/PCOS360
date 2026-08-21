import { Router } from 'express';
import { connectDB } from '../db';

const router = Router();

router.post('/', async (req, res) => {
  const profile = req.body;

  try {
    const db = await connectDB();
    await db.collection('users').insertOne({ ...profile, createdAt: new Date() });
    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save onboarding data.', error });
  }
});

export default router;
