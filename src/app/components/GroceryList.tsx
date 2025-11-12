"use client"

import { useState } from 'react'
import { ShoppingCart, Plus, Trash2, MapPin, Search, CheckCircle2, Circle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { UserProfile } from '@/lib/types'

interface GroceryItem {
  id: string
  name: string
  category: string
  calories: number
  protein: number
  carbs: number
  fat: number
  checked: boolean
  supermarket?: string
}

interface GroceryListProps {
  userProfile: UserProfile
  isPremium: boolean
}

export default function GroceryList({ userProfile, isPremium }: GroceryListProps) {
  const [items, setItems] = useState<GroceryItem[]>([
    {
      id: '1',
      name: 'Peito de Frango (1kg)',
      category: 'Proteínas',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      checked: false,
      supermarket: 'Carrefour - 2.5km'
    },
    {
      id: '2',
      name: 'Arroz Integral (1kg)',
      category: 'Carboidratos',
      calories: 370,
      protein: 7.9,
      carbs: 77,
      fat: 2.9,
      checked: false,
      supermarket: 'Pão de Açúcar - 1.8km'
    },
    {
      id: '3',
      name: 'Batata Doce (1kg)',
      category: 'Carboidratos',
      calories: 86,
      protein: 1.6,
      carbs: 20,
      fat: 0.1,
      checked: true,
      supermarket: 'Extra - 3.2km'
    },
    {
      id: '4',
      name: 'Ovos (dúzia)',
      category: 'Proteínas',
      calories: 155,
      protein: 13,
      carbs: 1.1,
      fat: 11,
      checked: false,
      supermarket: 'Carrefour - 2.5km'
    },
    {
      id: '5',
      name: 'Azeite Extra Virgem (500ml)',
      category: 'Gorduras Saudáveis',
      calories: 884,
      protein: 0,
      carbs: 0,
      fat: 100,
      checked: false,
      supermarket: 'Pão de Açúcar - 1.8km'
    }
  ])

  const [selectedSupermarket, setSelectedSupermarket] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSupermarket = selectedSupermarket === 'all' || item.supermarket?.includes(selectedSupermarket)
    return matchesSearch && matchesSupermarket
  })

  const supermarkets = ['Carrefour', 'Pão de Açúcar', 'Extra', 'Walmart']

  const getRecommendationBadge = (item: GroceryItem) => {
    if (userProfile.goal === 'lose') {
      if (item.calories < 200 && item.protein > 15) {
        return <Badge className="bg-green-500">Ótimo para Emagrecer</Badge>
      }
    } else if (userProfile.goal === 'gain') {
      if (item.protein > 20 || item.carbs > 50) {
        return <Badge className="bg-blue-500">Ótimo para Ganho</Badge>
      }
    }
    return <Badge variant="outline">Recomendado</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-3 rounded-xl shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Lista de Compras Inteligente</CardTitle>
                <CardDescription className="text-gray-700">
                  Alimentos recomendados para sua meta: <strong>
                    {userProfile.goal === 'lose' && 'Perder Peso'}
                    {userProfile.goal === 'gain' && 'Ganhar Massa'}
                    {userProfile.goal === 'maintain' && 'Manter Peso'}
                  </strong>
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Premium Feature Lock */}
      {!isPremium && (
        <Card className="border-2 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-4 shadow-lg">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                🔒 Recurso Premium
              </h3>
              <p className="text-gray-600 mb-4">
                Desbloqueie listas personalizadas com sugestões baseadas na sua meta e supermercados próximos
              </p>
              <Button className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white">
                Assinar Premium
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isPremium && (
        <>
          {/* Filters */}
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    <Search className="w-4 h-4 inline mr-2" />
                    Buscar Alimento
                  </label>
                  <Input
                    placeholder="Digite o nome do alimento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Supermercado
                  </label>
                  <select
                    value={selectedSupermarket}
                    onChange={(e) => setSelectedSupermarket(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="all">Todos os Supermercados</option>
                    {supermarkets.map(market => (
                      <option key={market} value={market}>{market}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grocery Items */}
          <div className="space-y-3">
            {filteredItems.map(item => (
              <Card 
                key={item.id} 
                className={`shadow-md transition-all duration-300 hover:shadow-lg ${
                  item.checked ? 'bg-gray-50 opacity-75' : 'bg-white'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="mt-1 flex-shrink-0"
                    >
                      {item.checked ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300" />
                      )}
                    </button>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className={`font-semibold text-gray-800 ${item.checked ? 'line-through' : ''}`}>
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                        {getRecommendationBadge(item)}
                      </div>

                      {/* Nutritional Info */}
                      <div className="grid grid-cols-4 gap-2 mb-3">
                        <div className="bg-blue-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-600">Calorias</p>
                          <p className="font-bold text-blue-600">{item.calories}</p>
                        </div>
                        <div className="bg-green-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-600">Proteína</p>
                          <p className="font-bold text-green-600">{item.protein}g</p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-600">Carbs</p>
                          <p className="font-bold text-orange-600">{item.carbs}g</p>
                        </div>
                        <div className="bg-purple-50 p-2 rounded text-center">
                          <p className="text-xs text-gray-600">Gordura</p>
                          <p className="font-bold text-purple-600">{item.fat}g</p>
                        </div>
                      </div>

                      {/* Supermarket Location */}
                      {item.supermarket && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span>{item.supermarket}</span>
                        </div>
                      )}
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Item Button */}
          <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Novo Item
          </Button>

          {/* Summary */}
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Itens</p>
                  <p className="text-2xl font-bold text-blue-600">{items.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Comprados</p>
                  <p className="text-2xl font-bold text-green-600">
                    {items.filter(i => i.checked).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pendentes</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {items.filter(i => !i.checked).length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Progresso</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.round((items.filter(i => i.checked).length / items.length) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
