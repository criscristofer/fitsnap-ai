"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Coffee, Utensils, Moon, Cookie } from 'lucide-react'
import type { Meal } from '@/lib/types'

interface MealLogProps {
  meals: Meal[]
  onAddMeal: () => void
}

export default function MealLog({ meals, onAddMeal }: MealLogProps) {
  const getMealIcon = (type: Meal['type']) => {
    switch (type) {
      case 'breakfast':
        return <Coffee className="w-5 h-5 text-orange-500" />
      case 'lunch':
        return <Utensils className="w-5 h-5 text-green-500" />
      case 'dinner':
        return <Moon className="w-5 h-5 text-purple-500" />
      case 'snack':
        return <Cookie className="w-5 h-5 text-pink-500" />
    }
  }

  const getMealLabel = (type: Meal['type']) => {
    switch (type) {
      case 'breakfast':
        return 'Café da Manhã'
      case 'lunch':
        return 'Almoço'
      case 'dinner':
        return 'Jantar'
      case 'snack':
        return 'Lanche'
    }
  }

  const groupedMeals = meals.reduce((acc, meal) => {
    if (!acc[meal.type]) {
      acc[meal.type] = []
    }
    acc[meal.type].push(meal)
    return acc
  }, {} as Record<Meal['type'], Meal[]>)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Suas Refeições</h2>
        <Button
          onClick={onAddMeal}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Refeição
        </Button>
      </div>

      {(['breakfast', 'lunch', 'dinner', 'snack'] as Meal['type'][]).map((mealType) => (
        <Card key={mealType} className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
            <CardTitle className="flex items-center gap-2">
              {getMealIcon(mealType)}
              {getMealLabel(mealType)}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {groupedMeals[mealType] && groupedMeals[mealType].length > 0 ? (
              <div className="space-y-4">
                {groupedMeals[mealType].map((meal) => (
                  <div
                    key={meal.id}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{meal.name}</h4>
                      <p className="text-sm text-gray-500">{meal.time}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-500">Calorias</p>
                        <p className="font-bold text-blue-600">{meal.calories}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Proteína</p>
                        <p className="font-bold text-red-600">{meal.protein}g</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Carbs</p>
                        <p className="font-bold text-yellow-600">{meal.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gordura</p>
                        <p className="font-bold text-purple-600">{meal.fat}g</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>Nenhuma refeição registrada ainda</p>
                <Button
                  onClick={onAddMeal}
                  variant="outline"
                  className="mt-4"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar {getMealLabel(mealType)}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
