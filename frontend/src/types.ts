export type UserProfile = {
  name: string;
  email: string;
  age: number;
  heightCm: number;
  weightKg: number;
  waistCm: number;
  diagnosedPCOS: boolean;
  tryingToConceive: boolean;
  medications: string;
  exerciseFrequency: string;
  dietStyle: string;
  symptoms: string[];
};

export type SymptomLog = {
  date: string;
  acne: number;
  facialHair: number;
  hairLoss: number;
  bloating: number;
  fatigue: number;
  pelvicPain: number;
  mood: number;
  anxiety: number;
  stress: number;
};

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: { email: string; name: string };
  Dashboard: undefined;
  SymptomTracker: undefined;
  WeightTracker: undefined;
  PeriodTracker: undefined;
  AfricanMealPlanner: undefined;
  WaterTracker: undefined;
  AICoach: undefined;
};
