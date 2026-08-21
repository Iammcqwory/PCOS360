import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    weight: '70 kg',
    waist: '84 cm',
    bmi: '24.1',
    daysSinceLastPeriod: 12,
    wellnessScore: 78,
    goals: {
      water: '8 glasses',
      exercise: '25 mins',
      mealPlan: 'Balanced African lunch',
      symptomReminder: 'Log symptoms today'
    }
  });
});

export default router;
