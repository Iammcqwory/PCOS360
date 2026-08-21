import { Router } from 'express';

const router = Router();

router.post('/coach', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message is required.' });

  const answer = `I recommend focusing on whole-food meals today, staying hydrated, and balancing protein with fiber. For symptom support, log your progress and seek medical advice for personalized care.`;
  res.json({ answer });
});

export default router;
