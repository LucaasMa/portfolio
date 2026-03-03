import { useState } from 'react'

interface Present {
  id: number
  name: string
  emoji: string
  color: string
}

export default function PresentRoulette() {
  const presents: Present[] = [
    {
      id: 1,
      name: 'Mini Day Spa',
      emoji: '🧖‍♀️',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 2,
      name: 'Role no Shopping Premium Plus',
      emoji: '🛍️',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      name: 'Kit Fitness (Barrinhas Dux + Corrida)',
      emoji: '🏃‍♀️',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 4,
      name: 'Desconto S26 Ultra',
      emoji: '📱',
      color: 'from-blue-500 to-cyan-500',
    },
  ]

  const [isSpinning, setIsSpinning] = useState(false)
  const [winner, setWinner] = useState<Present | null>(null)
  const [rotation, setRotation] = useState(0)

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setWinner(null)

    const spins = 15
    const segmentDegrees = 360 / presents.length
    const randomSegment = Math.floor(Math.random() * presents.length)
    const extraRotation = randomSegment * segmentDegrees + Math.random() * segmentDegrees * 0.8
    const finalRotation = spins * 360 + extraRotation

    setRotation(finalRotation)

    setTimeout(() => {
      const selectedPresent = presents[randomSegment]
      setWinner(selectedPresent)
      setIsSpinning(false)
    }, 5000)
  }

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Roulette */}
      <div className="relative w-72 h-72">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 flex flex-col items-center">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-yellow-400" />
          <div className="w-1 h-2 bg-yellow-400" />
        </div>

        {/* Roulette wheel */}
        <div
          className="w-full h-full rounded-full shadow-2xl transition-transform duration-5000 ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            background: `conic-gradient(
              from 0deg,
              ${presents.map((p, i) => {
                const angle = (360 / presents.length) * i
                const nextAngle = (360 / presents.length) * (i + 1)
                return `
                  ${getGradientStart(p.color)} ${angle}deg,
                  ${getGradientEnd(p.color)} ${nextAngle}deg
                `
              }).join(',')}
            )`,
          }}
        >
          {/* Segments with text */}
          {presents.map((present, index) => {
            const angle = (360 / presents.length) * index + 360 / presents.length / 2
            return (
              <div
                key={present.id}
                className="absolute w-full h-full flex items-start justify-center pt-4"
                style={{
                  transform: `rotate(${angle}deg)`,
                }}
              >
                <div
                  className="text-center text-white font-bold text-xs"
                  style={{
                    transform: `rotate(${90}deg)`,
                    maxWidth: '80px',
                  }}
                >
                  <div className="text-2xl mb-1">{present.emoji}</div>
                  <div className="text-xs line-clamp-2">{present.name}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="px-12 py-4 text-2xl font-bold text-white bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 rounded-full shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
      >
        {isSpinning ? '🎡 Girando...' : '🎉 GIRAR A ROLETA 🎉'}
      </button>

      {/* Winner Display */}
      {winner && (
        <div className="w-full max-w-md">
          <div
            className={`bg-gradient-to-br ${winner.color} p-8 rounded-2xl shadow-2xl text-center transform animate-bounce`}
          >
            <p className="text-white text-sm font-semibold mb-2">🌟 PARABÉNS! 🌟</p>
            <p className="text-5xl mb-4">{winner.emoji}</p>
            <p className="text-white text-2xl font-bold">{winner.name}</p>
          </div>
          <button
            onClick={handleSpin}
            className="w-full mt-6 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:shadow-lg transition-all"
          >
            ↻ Girar de Novo
          </button>
        </div>
      )}

      {/* Legend */}
      {!winner && (
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {presents.map((present) => (
            <div key={present.id} className="flex items-center gap-2">
              <span className="text-2xl">{present.emoji}</span>
              <span className="text-sm text-gray-300">{present.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getGradientStart(colorGradient: string): string {
  const colorMap: Record<string, string> = {
    'from-pink-500 to-rose-500': '#ec4899',
    'from-purple-500 to-pink-500': '#a855f7',
    'from-green-500 to-emerald-500': '#22c55e',
    'from-blue-500 to-cyan-500': '#3b82f6',
  }
  return colorMap[colorGradient] || '#9333ea'
}

function getGradientEnd(colorGradient: string): string {
  const colorMap: Record<string, string> = {
    'from-pink-500 to-rose-500': '#f43f5e',
    'from-purple-500 to-pink-500': '#ec4899',
    'from-green-500 to-emerald-500': '#10b981',
    'from-blue-500 to-cyan-500': '#06b6d4',
  }
  return colorMap[colorGradient] || '#d946ef'
}
