"use client"

import { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Camera, X, Upload, Sparkles, CheckCircle, XCircle, Lightbulb, TrendingUp, TrendingDown, AlertCircle, Gift } from 'lucide-react'
import type { UserProfile, Meal, FoodAnalysis } from '@/lib/types'

interface PhotoAnalysisProps {
  userProfile: UserProfile
  onClose: () => void
  onAddMeal: (meal: Meal) => void
  isPremium: boolean
  onUseFreePhoto: () => void
}

export default function PhotoAnalysis({
  userProfile,
  onClose,
  onAddMeal,
  isPremium,
  onUseFreePhoto
}: PhotoAnalysisProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<FoodAnalysis | null>(null)
  const [mealType, setMealType] = useState<Meal['type']>('lunch')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const canAnalyze = isPremium || userProfile.freePhotosRemaining > 0

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setAnalysis(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeFood = async () => {
    if (!selectedImage || !canAnalyze) return

    setIsAnalyzing(true)

    // Consome uma foto gratuita se não for premium
    if (!isPremium) {
      onUseFreePhoto()
    }

    // Simulação de análise com IA (em produção, chamaria API do OpenAI Vision)
    setTimeout(() => {
      const mockAnalysis: FoodAnalysis = {
        foodName: 'Prato de Frango Grelhado com Arroz e Salada',
        calories: 520,
        protein: 45,
        carbs: 60,
        fat: 12,
        portionSize: '1 prato médio (350g)',
        recommendation: userProfile.goal === 'lose' 
          ? '✅ RECOMENDADO para sua meta de emagrecimento'
          : userProfile.goal === 'gain'
          ? '⚠️ PARCIALMENTE RECOMENDADO - Considere adicionar mais calorias'
          : '✅ EXCELENTE para manutenção',
        reasoning: userProfile.goal === 'lose'
          ? 'Este prato é uma excelente escolha! Rico em proteínas (45g) que ajudam na saciedade e preservação muscular durante o déficit calórico. Os carboidratos (60g) fornecem energia sem exageros, e a gordura está em níveis moderados (12g). Com apenas 520 calorias, cabe perfeitamente no seu plano de emagrecimento.'
          : userProfile.goal === 'gain'
          ? 'Este prato tem boa qualidade nutricional, mas pode ser insuficiente para ganho de massa. Considere adicionar uma fonte extra de carboidratos (batata doce, mais arroz) ou gorduras saudáveis (abacate, azeite) para aumentar as calorias totais.'
          : 'Refeição equilibrada e completa! Ótima distribuição de macronutrientes com proteína de qualidade, carboidratos complexos e vegetais. Perfeito para manter seu peso atual.',
        alternatives: userProfile.goal === 'lose'
          ? [
              '💡 Para reduzir ainda mais: Substitua metade do arroz por mais salada',
              '💡 Aumente a saciedade: Adicione legumes grelhados (abobrinha, berinjela)',
              '💡 Versão light: Use peito de frango sem pele e temperos naturais'
            ]
          : userProfile.goal === 'gain'
          ? [
              '💪 Adicione: 100g de batata doce (+90 calorias)',
              '💪 Inclua: 1 colher de azeite na salada (+120 calorias)',
              '💪 Complemente: 1 abacate médio (+160 calorias)'
            ]
          : [
              '✨ Varie: Alterne o frango com peixe ou carne vermelha magra',
              '✨ Experimente: Diferentes tipos de grãos (quinoa, arroz integral)',
              '✨ Diversifique: Mude os vegetais da salada semanalmente'
            ]
      }

      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleAddMeal = () => {
    if (!analysis) return

    const newMeal: Meal = {
      id: Date.now().toString(),
      name: analysis.foodName,
      calories: analysis.calories,
      protein: analysis.protein,
      carbs: analysis.carbs,
      fat: analysis.fat,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      type: mealType,
      imageUrl: selectedImage || undefined
    }

    onAddMeal(newMeal)
  }

  const getRecommendationIcon = () => {
    if (!analysis) return null
    
    if (analysis.recommendation.includes('✅')) {
      return <CheckCircle className="w-6 h-6 text-green-500" />
    } else if (analysis.recommendation.includes('⚠️')) {
      return <AlertCircle className="w-6 h-6 text-yellow-500" />
    } else {
      return <XCircle className="w-6 h-6 text-red-500" />
    }
  }

  const getRecommendationColor = () => {
    if (!analysis) return 'gray'
    
    if (analysis.recommendation.includes('✅')) {
      return 'green'
    } else if (analysis.recommendation.includes('⚠️')) {
      return 'yellow'
    } else {
      return 'red'
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Análise Inteligente de Alimentos
            </CardTitle>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-sm text-white/90 mt-2">
            Tire uma foto do seu prato e receba análise personalizada baseada na sua meta: 
            <span className="font-bold">
              {userProfile.goal === 'lose' && ' Emagrecimento'}
              {userProfile.goal === 'gain' && ' Ganho de Massa'}
              {userProfile.goal === 'maintain' && ' Manutenção'}
            </span>
          </p>

          {/* Free Photos Counter */}
          {!isPremium && (
            <div className="mt-3 bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-yellow-300" />
                <span className="text-sm font-medium">
                  Fotos gratuitas restantes:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-yellow-300">
                  {userProfile.freePhotosRemaining}
                </span>
                <span className="text-sm text-white/80">/ 5</span>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Upload Section */}
          {!selectedImage && (
            <div className="space-y-4">
              <div
                onClick={() => canAnalyze && fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
                  canAnalyze 
                    ? 'border-gray-300 cursor-pointer hover:border-blue-500 hover:bg-blue-50' 
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                }`}
              >
                <Camera className={`w-16 h-16 mx-auto mb-4 ${canAnalyze ? 'text-gray-400' : 'text-gray-300'}`} />
                <p className={`text-lg font-medium mb-2 ${canAnalyze ? 'text-gray-700' : 'text-gray-500'}`}>
                  {canAnalyze 
                    ? 'Clique para tirar foto ou fazer upload'
                    : 'Você usou todas as fotos gratuitas'}
                </p>
                <p className="text-sm text-gray-500">
                  {canAnalyze 
                    ? 'Formatos aceitos: JPG, PNG, HEIC'
                    : 'Assine Premium para análises ilimitadas'}
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
                disabled={!canAnalyze}
              />
            </div>
          )}

          {/* Image Preview & Analysis */}
          {selectedImage && (
            <div className="space-y-6">
              {/* Image */}
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Food preview"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <Button
                  onClick={() => {
                    setSelectedImage(null)
                    setAnalysis(null)
                  }}
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Meal Type Selection */}
              {!analysis && (
                <div className="space-y-2">
                  <Label>Tipo de Refeição</Label>
                  <Select value={mealType} onValueChange={(value) => setMealType(value as Meal['type'])}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Café da Manhã</SelectItem>
                      <SelectItem value="lunch">Almoço</SelectItem>
                      <SelectItem value="dinner">Jantar</SelectItem>
                      <SelectItem value="snack">Lanche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Analyze Button */}
              {!analysis && (
                <Button
                  onClick={analyzeFood}
                  disabled={isAnalyzing || !canAnalyze}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                      Analisando com IA...
                    </>
                  ) : !canAnalyze ? (
                    <>
                      <XCircle className="w-5 h-5 mr-2" />
                      Sem fotos gratuitas
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Analisar Alimento {!isPremium && `(${userProfile.freePhotosRemaining} restantes)`}
                    </>
                  )}
                </Button>
              )}

              {/* Analysis Results */}
              {analysis && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  {/* Food Info */}
                  <Card className="border-2 border-gray-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        {analysis.foodName}
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Calorias</p>
                          <p className="text-2xl font-bold text-blue-600">{analysis.calories}</p>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <p className="text-sm text-gray-600">Proteína</p>
                          <p className="text-2xl font-bold text-red-600">{analysis.protein}g</p>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <p className="text-sm text-gray-600">Carbs</p>
                          <p className="text-2xl font-bold text-yellow-600">{analysis.carbs}g</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-gray-600">Gordura</p>
                          <p className="text-2xl font-bold text-purple-600">{analysis.fat}g</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-3 text-center">
                        Porção: {analysis.portionSize}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Recommendation */}
                  <Card className={`border-2 border-${getRecommendationColor()}-300 bg-${getRecommendationColor()}-50`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        {getRecommendationIcon()}
                        <div>
                          <h4 className="text-lg font-bold text-gray-800 mb-2">
                            {analysis.recommendation}
                          </h4>
                          <p className="text-gray-700 leading-relaxed">
                            {analysis.reasoning}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Alternatives */}
                  {analysis.alternatives && analysis.alternatives.length > 0 && (
                    <Card className="border-2 border-purple-200 bg-purple-50">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                          <Lightbulb className="w-5 h-5 text-purple-500" />
                          Sugestões Personalizadas
                        </h4>
                        <ul className="space-y-3">
                          {analysis.alternatives.map((alt, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                              <span className="text-purple-500 font-bold">•</span>
                              <span>{alt}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Add to Log Button */}
                  <Button
                    onClick={handleAddMeal}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg"
                    size="lg"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Adicionar ao Diário
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Premium Upsell - Only show when no free photos left */}
          {!isPremium && userProfile.freePhotosRemaining === 0 && (
            <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <Gift className="w-12 h-12 mx-auto text-yellow-500" />
                  <h3 className="text-xl font-bold text-gray-800">
                    Você usou suas 5 fotos gratuitas! 🎉
                  </h3>
                  <p className="text-gray-700">
                    Gostou da análise inteligente? Com o <span className="font-bold">Premium</span> você tem:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 text-left max-w-md mx-auto">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>✨ Análises ilimitadas de fotos com IA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>📊 Relatórios detalhados de progresso</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>🍽️ Planos de refeição personalizados</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>💪 Treinos customizados para sua meta</span>
                    </li>
                  </ul>
                  <Button
                    onClick={onClose}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg mt-4"
                    size="lg"
                  >
                    Assinar Premium - R$ 29,90/mês
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Free Photos Info */}
          {!isPremium && userProfile.freePhotosRemaining > 0 && selectedImage && !analysis && (
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <p className="text-sm text-gray-700 text-center">
                  💎 Você tem <span className="font-bold text-blue-600">{userProfile.freePhotosRemaining} análises gratuitas</span> restantes. 
                  Assine Premium para análises ilimitadas!
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
