import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import ScratchCard from '../components/ScratchCard'
import PresentRoulette from '../components/PresentRoulette'

export const Route = createFileRoute('/6anos')({
  component: SixYearsAnniversary,
  head: () => ({
    meta: [
      {
        title: '6 Anos | Lucas & Amor',
      },
      {
        name: 'description',
        content: '6 anos de amor, diversão e muchos momentos inesquecíveis',
      },
    ],
  }),
})

function SixYearsAnniversary() {
  const [revealedCards, setRevealedCards] = useState<number[]>([])
  const [showRoulette, setShowRoulette] = useState(false)

  const messages = [
    {
      id: 1,
      text: 'Obrigado por embarcar comigo na loucura de festas eletrônicas',
      color: 'from-purple-600 to-pink-600',
      photo: '/photos/card-1.jpg',
    },
    {
      id: 2,
      text: 'Obrigado por assistir anime comigo, por mais que eu seja chato e insuportável',
      color: 'from-blue-600 to-cyan-600',
      photo: '/photos/card-2.jpg',
    },
    {
      id: 3,
      text: 'Obrigado por me impulsionar a ser alguém melhor',
      color: 'from-amber-600 to-orange-600',
      photo: '/photos/card-3.jpg',
    },
  ]

  const handleCardRevealed = (cardId: number) => {
    if (!revealedCards.includes(cardId)) {
      setRevealedCards([...revealedCards, cardId])

      if (revealedCards.length === 2) {
        setTimeout(() => setShowRoulette(true), 500)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            6 Anos
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              Juntos
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            ✨ Raspe os cards para revelar mensagens especiais ✨
          </p>
        </div>

        {/* Scratch Cards Grid */}
        {!showRoulette && (
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {messages.map((message) => (
              <ScratchCard
                key={message.id}
                id={message.id}
                message={message.text}
                colorGradient={message.color}
                photo={message.photo}
                onRevealed={handleCardRevealed}
              />
            ))}
          </div>
        )}

        {/* Instruction or Roulette */}
        {!showRoulette && revealedCards.length < 3 && (
          <div className="text-center">
            <p className="text-gray-300 text-lg">
              Você revelou {revealedCards.length} de 3 mensagens
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`h-3 w-3 rounded-full transition-all ${
                    revealedCards.includes(message.id)
                      ? 'bg-gradient-to-r from-pink-400 to-cyan-400'
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Roulette Section */}
        {showRoulette && (
          <div className="text-center">
            <p className="text-2xl text-white mb-8 font-semibold">
              🎁 Agora, qual será seu presente? 🎁
            </p>
            <PresentRoulette />
          </div>
        )}
      </div>
    </div>
  )
}
