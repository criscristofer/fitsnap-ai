"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Star, TrendingDown, TrendingUp, Award } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  age: number
  goal: string
  result: string
  timeframe: string
  weight: {
    before: number
    after: number
  }
  image: string
  rating: number
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Maria Silva',
    age: 32,
    goal: 'Perder Peso',
    result: '-12kg',
    timeframe: '3 meses',
    weight: { before: 78, after: 66 },
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 5,
    quote: 'FitSnap changed my life! I managed to lose 12kg in 3 months just by taking photos of my food. The AI analysis helped me make better choices every day.'
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    age: 28,
    goal: 'Ganhar Massa',
    result: '+8kg',
    timeframe: '4 meses',
    weight: { before: 68, after: 76 },
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 5,
    quote: 'Finalmente consegui ganhar massa muscular de forma saudável! O app me mostrou exatamente quais alimentos comer para bater minhas metas de proteína. Recomendo demais!'
  },
  {
    id: '3',
    name: 'Ana Paula',
    age: 35,
    goal: 'Perder Peso',
    result: '-18kg',
    timeframe: '6 meses',
    weight: { before: 88, after: 70 },
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    rating: 5,
    quote: 'Incrível! Perdi 18kg e me sinto uma nova pessoa. O melhor é que não precisei fazer dietas malucas, apenas aprendi a comer melhor com a ajuda da IA.'
  },
  {
    id: '4',
    name: 'Roberto Santos',
    age: 42,
    goal: 'Perder Peso',
    result: '-15kg',
    timeframe: '5 meses',
    weight: { before: 95, after: 80 },
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 5,
    quote: 'Aos 42 anos achei que seria impossível emagrecer. O FitSnap provou que eu estava errado! Perdi 15kg e recuperei minha autoestima. Obrigado!'
  },
  {
    id: '5',
    name: 'Juliana Costa',
    age: 26,
    goal: 'Definição',
    result: '-6kg',
    timeframe: '2 meses',
    weight: { before: 62, after: 56 },
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    rating: 5,
    quote: 'Consegui definir meu corpo e perder gordura mantendo massa muscular. A lista personalizada de alimentos foi essencial para meus resultados!'
  },
  {
    id: '6',
    name: 'Pedro Oliveira',
    age: 30,
    goal: 'Ganhar Massa',
    result: '+10kg',
    timeframe: '5 meses',
    weight: { before: 65, after: 75 },
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    rating: 5,
    quote: 'Sempre fui magro e tinha dificuldade para ganhar peso. Com o FitSnap aprendi a comer certo e ganhei 10kg de massa muscular. Mudou minha vida!'
  }
]

export default function Testimonials() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-4 shadow-lg">
          <Award className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Resultados Reais de Pessoas Reais
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Milhares de pessoas já transformaram seus corpos com o FitSnap AI. Veja as histórias inspiradoras de quem alcançou suas metas!
        </p>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">10k+</div>
            <div className="text-sm text-gray-600">Usuários Ativos</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">-8.5kg</div>
            <div className="text-sm text-gray-600">Média de Perda</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">4.9★</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">95%</div>
            <div className="text-sm text-gray-600">Taxa de Sucesso</div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-2 hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 shadow-md"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.age} anos</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Goal Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
                {testimonial.goal === 'Perder Peso' && <TrendingDown className="w-4 h-4" />}
                {testimonial.goal === 'Ganhar Massa' && <TrendingUp className="w-4 h-4" />}
                {testimonial.goal === 'Definição' && <Award className="w-4 h-4" />}
                {testimonial.goal}
              </div>

              {/* Results */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-4 border-2 border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold text-gray-800">{testimonial.weight.before}kg</div>
                    <div className="text-xs text-gray-600">Antes</div>
                  </div>
                  <div className="text-3xl font-bold text-green-600 px-4">→</div>
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold text-gray-800">{testimonial.weight.after}kg</div>
                    <div className="text-xs text-gray-600">Depois</div>
                  </div>
                </div>
                <div className="text-center pt-2 border-t border-green-200">
                  <span className="text-2xl font-bold text-green-600">{testimonial.result}</span>
                  <span className="text-sm text-gray-600 ml-2">em {testimonial.timeframe}</span>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-gray-700 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Banner */}
      <Card className="mt-8 border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            Você Pode Ser o Próximo! 🎯
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram seus corpos com o FitSnap AI. 
            Comece hoje mesmo com 5 análises gratuitas!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="font-semibold text-gray-800">4.9/5.0 estrelas</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Award className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-800">10.000+ usuários</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
