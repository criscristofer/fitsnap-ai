export type Goal = 'lose' | 'maintain' | 'gain';

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: Goal;
  targetWeight: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  freePhotosRemaining: number; // Controle de fotos gratuitas
  accountCreatedAt: string; // Data de criação da conta
  lastFreePhotoResetDate?: string; // Data da última renovação das fotos gratuitas (60 dias)
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  imageUrl?: string;
}

export interface DailyLog {
  date: string;
  meals: Meal[];
  water: number;
  exercise: number;
  weight?: number;
}

export interface FoodAnalysis {
  foodName: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  recommendation: string;
  reasoning: string;
  alternatives?: string[];
  portionSize: string;
}
