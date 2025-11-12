"use client"

import { useState } from 'react'
import { Camera, TrendingDown, TrendingUp, Target, Utensils, ShoppingCart, Activity, Image as ImageIcon, Crown, Zap, Gift, Clock, CheckCircle2, Sparkles, HeartHandshake, ListChecks, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PhotoAnalysis from './components/PhotoAnalysis'
import DashboardStats from './components/DashboardStats'
import MealLog from './components/MealLog'
import GroceryList from './components/GroceryList'
import Statistics from './components/Statistics'
import ProgressPhotos from './components/ProgressPhotos'
import Testimonials from './components/Testimonials'
import type { UserProfile, DailyLog, Meal } from '@/lib/types'

export default function FitnessDashboard() {
  const [showPhotoAnalysis, setShowPhotoAnalysis] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [showPremiumModal, setShowPremiumModal] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock user data - Novo usuário com 5 fotos gratuitas
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "João Silva",
    age: 28,
    weight: 85,
    height: 175,
    goal: 'lose',
    targetWeight: 75,
    activityLevel: 'moderate',
    dailyCalories: 2000,
    dailyProtein: 150,
    dailyCarbs: 200,
    dailyFat: 67,
    freePhotosRemaining: 5,
    accountCreatedAt: new Date().toISOString(),
    lastFreePhotoResetDate: new Date().toISOString()
  })

  const [dailyLog, setDailyLog] = useState<DailyLog>({
    date: new Date().toISOString().split('T')[0],
    meals: [
      {
        id: '1',
        name: 'Omelete com queijo',
        calories: 320,
        protein: 24,
        carbs: 8,
        fat: 22,
        time: '08:30',
        type: 'breakfast'
      },
      {
        id: '2',
        name: 'Frango grelhado com arroz',
        calories: 520,
        protein: 45,
        carbs: 60,
        fat: 12,
        time: '12:45',
        type: 'lunch'
      }
    ],
    water: 6,
    exercise: 300
  })

  const totalConsumed = {
    calories: dailyLog.meals.reduce((sum, meal) => sum + meal.calories, 0),
    protein: dailyLog.meals.reduce((sum, meal) => sum + meal.protein, 0),
    carbs: dailyLog.meals.reduce((sum, meal) => sum + meal.carbs, 0),
    fat: dailyLog.meals.reduce((sum, meal) => sum + meal.fat, 0)
  }

  const remaining = {
    calories: userProfile.dailyCalories - totalConsumed.calories,
    protein: userProfile.dailyProtein - totalConsumed.protein,
    carbs: userProfile.dailyCarbs - totalConsumed.carbs,
    fat: userProfile.dailyFat - totalConsumed.fat
  }

  const addMealFromPhoto = (meal: Meal) => {
    setDailyLog(prev => ({
      ...prev,
      meals: [...prev.meals, meal]
    }))
    setShowPhotoAnalysis(false)
  }

  const handleUseFreePhoto = () => {
    if (!isPremium && userProfile.freePhotosRemaining > 0) {
      setUserProfile(prev => ({
        ...prev,
        freePhotosRemaining: prev.freePhotosRemaining - 1
      }))
    }
  }

  // Calcular dias restantes para renovação das fotos gratuitas
  const getDaysUntilReset = () => {
    const lastReset = new Date(userProfile.lastFreePhotoResetDate || userProfile.accountCreatedAt)
    const nextReset = new Date(lastReset)
    nextReset.setDate(nextReset.getDate() + 60)
    const today = new Date()
    const daysLeft = Math.ceil((nextReset.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, daysLeft)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/90 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  FitSnap AI
                </h1>
                <p className="text-xs text-gray-500">Transforme seu corpo com inteligência</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Free Photos Badge */}
              {!isPremium && (
                <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-4 py-2 rounded-full border-2 border-blue-300 shadow-sm">
                  <Gift className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">
                    <span className="font-bold text-blue-600">{userProfile.freePhotosRemaining}</span> análises grátis
                  </span>
                </div>
              )}

              <Button
                onClick={() => setShowPremiumModal(true)}
                className={`${
                  isPremium 
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 hover:from-amber-500 hover:via-yellow-600 hover:to-orange-600' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
                } text-white shadow-lg transition-all duration-300 hover:scale-105 font-semibold`}
              >
                <Crown className="w-4 h-4 mr-2" />
                {isPremium ? 'Premium Ativo' : 'Seja Premium'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Banner - Pessoas Fitness Motivacionais */}
        <div className="mb-8 relative overflow-hidden rounded-3xl shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/90 to-cyan-900/95 z-10"></div>
          
          {/* Background Images Grid */}
          <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-40">
            <div className="relative h-full">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=800&fit=crop" 
                alt="Fitness motivation"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=800&fit=crop" 
                alt="Fitness determination"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-full">
              <img 
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=800&fit=crop" 
                alt="Fitness goals"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="relative z-20 p-8 md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Transforme Seu Corpo,<br />
                <span className="text-cyan-300">Alcance Suas Metas</span>
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Junte-se a milhares de pessoas determinadas que estão conquistando seus objetivos com tecnologia de ponta
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300" />
                  <span className="text-white font-medium">Análise por IA</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300" />
                  <span className="text-white font-medium">Resultados Reais</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300" />
                  <span className="text-white font-medium lasy-highlight">Suporte 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Olá, {userProfile.name}! 👋
          </h2>
          <p className="text-gray-600">
            {userProfile.goal === 'lose' && 'Você está no caminho certo para perder peso e conquistar o corpo dos seus sonhos!'}
            {userProfile.goal === 'gain' && 'Continue firme no ganho de massa! Cada treino te aproxima do seu objetivo!'}
            {userProfile.goal === 'maintain' && 'Mantendo o equilíbrio perfeito! Consistência é a chave do sucesso!'}
          </p>
        </div>

        {/* Free Photos Status Banner */}
        {!isPremium && userProfile.freePhotosRemaining === 0 && (
          <Card className="mb-6 border-2 border-orange-400 bg-gradient-to-br from-orange-50 to-red-50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      🔒 Análises Gratuitas Esgotadas
                    </h3>
                    <p className="text-gray-700 text-sm mb-2">
                      Você usou suas 5 análises gratuitas. Próximas 5 análises disponíveis em <span className="font-bold text-orange-600">{getDaysUntilReset()} dias</span>.
                    </p>
                    <p className="text-xs text-gray-600">
                      💡 Ou assine o Premium e tenha análises ilimitadas agora!
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowPremiumModal(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg whitespace-nowrap"
                >
                  <Crown className="w-5 h-5 mr-2" />
                  Ver Planos
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Welcome Gift Banner - Only for new users with free photos */}
        {!isPremium && userProfile.freePhotosRemaining === 5 && (
          <Card className="mb-6 border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl shadow-lg animate-pulse">
                    <Gift className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      🎉 Bem-vindo ao FitSnap AI!
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Como presente de boas-vindas, você ganhou <span className="font-bold text-green-600">5 análises gratuitas</span> com nossa IA! 
                      Tire fotos dos seus alimentos e descubra se eles são recomendados para sua meta.
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowPhotoAnalysis(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg whitespace-nowrap"
                >
                  Usar Agora
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Photo Analysis CTA - DIFERENCIAL */}
        <Card className="mb-8 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-4 rounded-2xl shadow-lg">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    🚀 Análise Inteligente por Foto
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Tire uma foto do seu prato e receba análise completa com recomendações personalizadas para sua meta!
                  </p>
                  {!isPremium && (
                    <div className="flex items-center gap-2">
                      {userProfile.freePhotosRemaining > 0 ? (
                        <p className="text-xs text-blue-600 font-medium">
                          ✨ {userProfile.freePhotosRemaining} análises gratuitas disponíveis
                        </p>
                      ) : (
                        <p className="text-xs text-orange-600 font-medium">
                          🔒 Próximas análises em {getDaysUntilReset()} dias ou assine Premium
                        </p>
                      )}
                    </div>
                  )}
                  {isPremium && (
                    <p className="text-xs text-amber-600 font-medium">
                      👑 Análises ilimitadas • Você é Premium!
                    </p>
                  )}
                </div>
              </div>
              <Button
                onClick={() => {
                  if (!isPremium && userProfile.freePhotosRemaining === 0) {
                    setShowPremiumModal(true)
                  } else {
                    setShowPhotoAnalysis(true)
                  }
                }}
                size="lg"
                className={`${
                  !isPremium && userProfile.freePhotosRemaining === 0
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600'
                } text-white shadow-lg transition-all duration-300 hover:scale-105 whitespace-nowrap`}
              >
                <Camera className="w-5 h-5 mr-2" />
                {!isPremium && userProfile.freePhotosRemaining === 0 
                  ? 'Desbloquear Análises'
                  : 'Analisar Alimento'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard with Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-white shadow-md">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Target className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="photo" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Camera className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Foto</span>
            </TabsTrigger>
            <TabsTrigger value="meals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Utensils className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Refeições</span>
            </TabsTrigger>
            <TabsTrigger value="grocery" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Compras</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Estatísticas</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <ImageIcon className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Evolução</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              <Award className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Resultados</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats
              userProfile={userProfile}
              totalConsumed={totalConsumed}
              remaining={remaining}
              dailyLog={dailyLog}
            />
          </TabsContent>

          <TabsContent value="photo" className="space-y-6">
            <Card className="border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Camera className="w-6 h-6 text-blue-600" />
                  Análise de Alimentos por Foto
                </CardTitle>
                <CardDescription className="text-gray-700">
                  Tire uma foto do seu alimento e receba análise nutricional completa com recomendações personalizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Button
                  onClick={() => {
                    if (!isPremium && userProfile.freePhotosRemaining === 0) {
                      setShowPremiumModal(true)
                    } else {
                      setShowPhotoAnalysis(true)
                    }
                  }}
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg text-lg py-6"
                >
                  <Camera className="w-6 h-6 mr-2" />
                  Tirar Foto e Analisar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="meals" className="space-y-6">
            <MealLog
              meals={dailyLog.meals}
              onAddMeal={() => setShowPhotoAnalysis(true)}
            />
          </TabsContent>

          <TabsContent value="grocery" className="space-y-6">
            <GroceryList userProfile={userProfile} isPremium={isPremium} />
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <Statistics userProfile={userProfile} isPremium={isPremium} />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressPhotos isPremium={isPremium} />
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-6">
            <Testimonials />
          </TabsContent>
        </Tabs>

        {/* Premium Features Card */}
        {!isPremium && (
          <Card className="mt-8 border-2 border-amber-400 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 shadow-2xl">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  Desbloqueie Todo o Potencial
                </h3>
                <p className="text-lg text-gray-600">
                  Transforme sua jornada fitness com recursos premium
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg shadow-md flex-shrink-0">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Análises Ilimitadas</h4>
                    <p className="text-sm text-gray-600">Tire quantas fotos quiser e receba análises detalhadas instantaneamente</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-2 rounded-lg shadow-md flex-shrink-0">
                    <ListChecks className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Lista de Alimentos Personalizada</h4>
                    <p className="text-sm text-gray-600">Sugestões de alimentos de acordo com sua meta e preferências</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg shadow-md flex-shrink-0">
                    <HeartHandshake className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Suporte 24/7</h4>
                    <p className="text-sm text-gray-600">Tire suas dúvidas a qualquer hora com nossa equipe especializada</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-lg shadow-md flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Escolha Seus Alimentos</h4>
                    <p className="text-sm text-gray-600">Selecione o que prefere comer sem sair do foco da sua dieta</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-800">R$ 29,90</span>
                  <span className="text-gray-600 ml-2">/mês</span>
                </div>
                <Button
                  onClick={() => setShowPremiumModal(true)}
                  size="lg"
                  className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 hover:from-amber-500 hover:via-yellow-600 hover:to-orange-600 text-white shadow-xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                >
                  <Crown className="w-6 h-6 mr-2" />
                  Assinar Premium Agora
                </Button>
                <p className="text-xs text-gray-500 mt-3">
                  Cancele quando quiser • Sem compromisso
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Photo Analysis Modal */}
      {showPhotoAnalysis && (
        <PhotoAnalysis
          userProfile={userProfile}
          onClose={() => setShowPhotoAnalysis(false)}
          onAddMeal={addMealFromPhoto}
          isPremium={isPremium}
          onUseFreePhoto={handleUseFreePhoto}
        />
      )}

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-amber-400 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">FitSnap Premium</CardTitle>
                    <CardDescription className="text-white/90">
                      Alcance suas metas mais rápido
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPremiumModal(false)}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-800 mb-2">
                    R$ 29,90<span className="text-2xl text-gray-600">/mês</span>
                  </div>
                  <p className="text-gray-600">Investimento no seu corpo e saúde</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-gray-800 mb-4">O que está incluído:</h4>
                  
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Análises Ilimitadas com IA</p>
                      <p className="text-sm text-gray-600">Sem limite de fotos. Analise todos os seus alimentos quando quiser.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Lista Personalizada de Alimentos</p>
                      <p className="text-sm text-gray-600">Sugestões inteligentes baseadas na sua meta (emagrecer, ganhar massa, etc).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Escolha Seus Alimentos Favoritos</p>
                      <p className="text-sm text-gray-600">Selecione o que você gosta de comer sem sair do foco da dieta.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Suporte 24 horas por dia</p>
                      <p className="text-sm text-gray-600">Tire dúvidas e receba orientações a qualquer momento.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">Relatórios Detalhados</p>
                      <p className="text-sm text-gray-600">Acompanhe seu progresso com gráficos e estatísticas avançadas.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                  <p className="text-sm text-gray-600 text-center">
                    <strong>Plano Gratuito:</strong> 5 análises a cada 60 dias<br />
                    <strong>Plano Premium:</strong> Análises ilimitadas + todos os recursos
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setIsPremium(true)
                    setShowPremiumModal(false)
                  }}
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 hover:from-amber-500 hover:via-yellow-600 hover:to-orange-600 text-white shadow-xl transition-all duration-300 hover:scale-105 text-lg py-6"
                >
                  <Crown className="w-6 h-6 mr-2" />
                  Assinar Premium por R$ 29,90/mês
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Cancele quando quiser • Sem compromisso • Pagamento seguro
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
