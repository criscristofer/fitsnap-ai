"use client"

import { useState } from 'react'
import { TrendingDown, TrendingUp, Activity, Calendar, Flame, Droplets, Dumbbell, Target } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { UserProfile } from '@/lib/types'

interface StatisticsProps {
  userProfile: UserProfile
  isPremium: boolean
}

export default function Statistics({ userProfile, isPremium }: StatisticsProps) {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week')

  // Mock data para gráficos
  const weeklyData = [
    { day: 'Seg', calories: 1850, weight: 85.0, water: 8 },
    { day: 'Ter', calories: 2100, weight: 84.8, water: 7 },
    { day: 'Qua', calories: 1950, weight: 84.7, water: 9 },
    { day: 'Qui', calories: 2050, weight: 84.5, water: 8 },
    { day: 'Sex', calories: 1900, weight: 84.3, water: 10 },
    { day: 'Sáb', calories: 2200, weight: 84.2, water: 6 },
    { day: 'Dom', calories: 2000, weight: 84.0, water: 8 }
  ]

  const maxCalories = Math.max(...weeklyData.map(d => d.calories))
  const maxWater = Math.max(...weeklyData.map(d => d.water))

  const stats = {
    avgCalories: Math.round(weeklyData.reduce((sum, d) => sum + d.calories, 0) / weeklyData.length),
    avgWater: Math.round(weeklyData.reduce((sum, d) => sum + d.water, 0) / weeklyData.length),
    weightLost: weeklyData[0].weight - weeklyData[weeklyData.length - 1].weight,
    daysOnTrack: 5,
    totalWorkouts: 12,
    caloriesBurned: 3200
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-3 rounded-xl shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Estatísticas e Gráficos</CardTitle>
                <CardDescription className="text-gray-700">
                  Acompanhe seu desempenho e progresso detalhado
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Time Range Selector */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setTimeRange('week')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            timeRange === 'week'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Semana
        </button>
        <button
          onClick={() => setTimeRange('month')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            timeRange === 'month'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Mês
        </button>
        <button
          onClick={() => setTimeRange('year')}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            timeRange === 'year'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Ano
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-8 h-8 text-orange-500" />
              <span className="text-sm font-medium text-gray-600">Média</span>
            </div>
            <p className="text-3xl font-bold text-orange-600 mb-1">{stats.avgCalories}</p>
            <p className="text-sm text-gray-600">Calorias/dia</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="w-8 h-8 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Média</span>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-1">{stats.avgWater}</p>
            <p className="text-sm text-gray-600">Copos/dia</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-8 h-8 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Esta Semana</span>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-1">-{stats.weightLost.toFixed(1)}kg</p>
            <p className="text-sm text-gray-600">Peso perdido</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Sequência</span>
            </div>
            <p className="text-3xl font-bold text-purple-600 mb-1">{stats.daysOnTrack}</p>
            <p className="text-sm text-gray-600">Dias no foco</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-300 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Dumbbell className="w-8 h-8 text-indigo-500" />
              <span className="text-sm font-medium text-gray-600">Total</span>
            </div>
            <p className="text-3xl font-bold text-indigo-600 mb-1">{stats.totalWorkouts}</p>
            <p className="text-sm text-gray-600">Treinos</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-8 h-8 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Total</span>
            </div>
            <p className="text-3xl font-bold text-red-600 mb-1">{stats.caloriesBurned}</p>
            <p className="text-sm text-gray-600">Calorias queimadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Calories Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Consumo de Calorias
          </CardTitle>
          <CardDescription>Últimos 7 dias</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{data.day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-600">{data.calories} kcal</span>
                    {data.calories <= userProfile.dailyCalories && (
                      <span className="text-xs text-green-600">✓</span>
                    )}
                  </div>
                </div>
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                      data.calories <= userProfile.dailyCalories
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                        : 'bg-gradient-to-r from-orange-400 to-red-500'
                    }`}
                    style={{ width: `${(data.calories / maxCalories) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 border-r-2 border-dashed border-blue-500"
                    style={{ left: `${(userProfile.dailyCalories / maxCalories) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded"></div>
              <span>Dentro da meta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded"></div>
              <span>Acima da meta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 border-r-2 border-dashed border-blue-500"></div>
              <span>Meta diária ({userProfile.dailyCalories} kcal)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Water Intake Chart */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            Hidratação
          </CardTitle>
          <CardDescription>Copos de água por dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{data.day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-blue-600">{data.water} copos</span>
                    {data.water >= 8 && (
                      <span className="text-xs text-green-600">✓</span>
                    )}
                  </div>
                </div>
                <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                      data.water >= 8
                        ? 'bg-gradient-to-r from-blue-400 to-cyan-500'
                        : 'bg-gradient-to-r from-orange-400 to-yellow-500'
                    }`}
                    style={{ width: `${(data.water / maxWater) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Meta:</strong> 8 copos por dia (2 litros)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Weight Progress */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-green-500" />
            Evolução do Peso
          </CardTitle>
          <CardDescription>Progresso semanal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">{data.day}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-800">{data.weight} kg</span>
                  {index > 0 && (
                    <span className={`text-sm font-medium ${
                      data.weight < weeklyData[index - 1].weight
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {data.weight < weeklyData[index - 1].weight ? '↓' : '↑'}
                      {Math.abs(data.weight - weeklyData[index - 1].weight).toFixed(1)}kg
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Progresso Total</p>
                <p className="text-2xl font-bold text-green-600">
                  -{stats.weightLost.toFixed(1)}kg
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Falta para Meta</p>
                <p className="text-2xl font-bold text-blue-600">
                  {(userProfile.weight - userProfile.targetWeight).toFixed(1)}kg
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
