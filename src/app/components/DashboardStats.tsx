"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Flame, Beef, Wheat, Droplet, Dumbbell, Target } from 'lucide-react'
import type { UserProfile, DailyLog } from '@/lib/types'

interface DashboardStatsProps {
  userProfile: UserProfile
  totalConsumed: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  remaining: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  dailyLog: DailyLog
}

export default function DashboardStats({
  userProfile,
  totalConsumed,
  remaining,
  dailyLog
}: DashboardStatsProps) {
  const caloriesPercent = (totalConsumed.calories / userProfile.dailyCalories) * 100
  const proteinPercent = (totalConsumed.protein / userProfile.dailyProtein) * 100
  const carbsPercent = (totalConsumed.carbs / userProfile.dailyCarbs) * 100
  const fatPercent = (totalConsumed.fat / userProfile.dailyFat) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calories Card */}
      <Card className="shadow-lg border-2 border-blue-100 hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Flame className="w-5 h-5" />
            Calorias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">
                {totalConsumed.calories}
                <span className="text-xl text-gray-500">/{userProfile.dailyCalories}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {remaining.calories > 0 ? `${remaining.calories} restantes` : `${Math.abs(remaining.calories)} acima da meta`}
              </p>
            </div>
            <Progress 
              value={Math.min(caloriesPercent, 100)} 
              className="h-3"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0</span>
              <span>{userProfile.dailyCalories}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Macros Card */}
      <Card className="shadow-lg border-2 border-green-100 hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <Target className="w-5 h-5" />
            Macronutrientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Protein */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Beef className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">Proteína</span>
                </div>
                <span className="text-sm text-gray-600">
                  {totalConsumed.protein}g / {userProfile.dailyProtein}g
                </span>
              </div>
              <Progress value={Math.min(proteinPercent, 100)} className="h-2 bg-red-100" />
            </div>

            {/* Carbs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wheat className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Carboidratos</span>
                </div>
                <span className="text-sm text-gray-600">
                  {totalConsumed.carbs}g / {userProfile.dailyCarbs}g
                </span>
              </div>
              <Progress value={Math.min(carbsPercent, 100)} className="h-2 bg-yellow-100" />
            </div>

            {/* Fat */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Gorduras</span>
                </div>
                <span className="text-sm text-gray-600">
                  {totalConsumed.fat}g / {userProfile.dailyFat}g
                </span>
              </div>
              <Progress value={Math.min(fatPercent, 100)} className="h-2 bg-blue-100" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Water & Exercise Card */}
      <Card className="shadow-lg border-2 border-cyan-100 hover:shadow-xl transition-shadow lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-600">
            <Droplet className="w-5 h-5" />
            Hidratação & Exercícios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Water */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Água (copos de 250ml)</span>
                <span className="text-2xl font-bold text-cyan-600">{dailyLog.water}/8</span>
              </div>
              <div className="flex gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-12 flex-1 rounded-lg transition-all ${
                      i < dailyLog.water
                        ? 'bg-gradient-to-t from-cyan-500 to-blue-400 shadow-md'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Exercise */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Calorias Queimadas</span>
                <span className="text-2xl font-bold text-orange-600">{dailyLog.exercise} kcal</span>
              </div>
              <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Dumbbell className="w-8 h-8 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Ótimo trabalho!</p>
                    <p className="text-xs text-gray-600">Continue assim para atingir sua meta</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
