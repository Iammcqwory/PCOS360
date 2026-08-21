import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required.' });

  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret-key', {
    expiresIn: '7d'
  });

  res.json({ token, email });
});

export default router;
