"use client"

import { useState } from 'react'
import { Camera, Calendar, TrendingDown, Image as ImageIcon, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ProgressPhoto {
  id: string
  date: string
  weight: number
  imageUrl: string
  notes?: string
}

interface ProgressPhotosProps {
  isPremium: boolean
}

export default function ProgressPhotos({ isPremium }: ProgressPhotosProps) {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([
    {
      id: '1',
      date: '2025-01-01',
      weight: 85,
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
      notes: 'Início da jornada'
    },
    {
      id: '2',
      date: '2025-02-01',
      weight: 82,
      imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=600&fit=crop',
      notes: 'Primeiro mês - 3kg perdidos!'
    },
    {
      id: '3',
      date: '2025-03-01',
      weight: 79,
      imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=600&fit=crop',
      notes: 'Segundo mês - Músculos aparecendo'
    }
  ])

  const [showUploadModal, setShowUploadModal] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Aqui você implementaria o upload real
      console.log('Uploading file:', file)
      setShowUploadModal(false)
    }
  }

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id))
  }

  const weightLost = photos.length > 1 ? photos[0].weight - photos[photos.length - 1].weight : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl shadow-lg">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">Fotos de Evolução</CardTitle>
                <CardDescription className="text-gray-700">
                  Acompanhe sua transformação visual ao longo do tempo
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Stats Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300 shadow-md">
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Tempo de Jornada</p>
            <p className="text-3xl font-bold text-blue-600">
              {photos.length > 0 ? Math.ceil((new Date().getTime() - new Date(photos[0].date).getTime()) / (1000 * 60 * 60 * 24)) : 0} dias
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 shadow-md">
          <CardContent className="p-6 text-center">
            <TrendingDown className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Peso Perdido</p>
            <p className="text-3xl font-bold text-green-600">{weightLost.toFixed(1)}kg</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-300 shadow-md">
          <CardContent className="p-6 text-center">
            <ImageIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-1">Fotos Registradas</p>
            <p className="text-3xl font-bold text-purple-600">{photos.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Upload Button */}
      <Button
        onClick={() => setShowUploadModal(true)}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
        size="lg"
      >
        <Camera className="w-5 h-5 mr-2" />
        Adicionar Nova Foto de Progresso
      </Button>

      {/* Photos Timeline */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          Linha do Tempo
        </h3>

        {photos.length === 0 ? (
          <Card className="shadow-md">
            <CardContent className="p-12 text-center">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-600 mb-2">
                Nenhuma foto ainda
              </h4>
              <p className="text-gray-500 mb-4">
                Comece a registrar sua evolução tirando sua primeira foto!
              </p>
              <Button
                onClick={() => setShowUploadModal(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                <Camera className="w-5 h-5 mr-2" />
                Tirar Primeira Foto
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <Card key={photo.id} className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative">
                  <img
                    src={photo.imageUrl}
                    alt={`Progresso ${photo.date}`}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {index === photos.length - 1 && (
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        Mais Recente
                      </Badge>
                    )}
                    {index === 0 && (
                      <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        Início
                      </Badge>
                    )}
                  </div>
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(photo.date).toLocaleDateString('pt-BR')}
                    </div>
                    <Badge variant="outline" className="font-bold">
                      {photo.weight}kg
                    </Badge>
                  </div>
                  {photo.notes && (
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                      {photo.notes}
                    </p>
                  )}
                  {index > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-600">
                        Diferença: <span className="font-bold text-green-600">
                          -{(photos[index - 1].weight - photo.weight).toFixed(1)}kg
                        </span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <CardTitle>Adicionar Foto de Progresso</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUploadModal(false)}
                  className="text-white hover:bg-white/20"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso Atual (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: 75.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas (opcional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Como você está se sentindo?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Clique para tirar ou escolher foto
                      </p>
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Salvar Foto de Progresso
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
