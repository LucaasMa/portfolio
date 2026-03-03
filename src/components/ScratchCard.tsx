import { useRef, useEffect, useState } from 'react'

interface ScratchCardProps {
  id: number
  message: string
  colorGradient: string
  photo?: string
  onRevealed: (id: number) => void
}

export default function ScratchCard({
  id,
  message,
  colorGradient,
  photo,
  onRevealed,
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Draw scratch layer
    ctx.fillStyle = '#e5e7eb'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Add texture
    ctx.fillStyle = '#d1d5db'
    for (let i = 0; i < canvas.offsetWidth; i += 4) {
      for (let j = 0; j < canvas.offsetHeight; j += 4) {
        if (Math.random() > 0.5) {
          ctx.fillRect(i, j, 2, 2)
        }
      }
    }

    // Draw text on scratch layer
    ctx.fillStyle = '#666'
    ctx.font = 'bold 16px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('RASPE AQUI', canvas.offsetWidth / 2, canvas.offsetHeight / 2)
  }, [])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    scratch(e)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    scratch(e)
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    checkReveal()
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    scratchTouch(e)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    scratchTouch(e)
  }

  const handleTouchEnd = () => {
    setIsDrawing(false)
    checkReveal()
  }

  const scratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    clearCircle(x, y)
  }

  const scratchTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const touch = e.touches[0]
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top

    clearCircle(x, y)
  }

  const clearCircle = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(x - 15, y - 15, 30, 30)
  }

  const checkReveal = () => {
    const canvas = canvasRef.current
    if (!canvas || isRevealed) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const imageData = ctx.getImageData(
      0,
      0,
      canvas.offsetWidth,
      canvas.offsetHeight
    )
    const data = imageData.data

    let transparentPixels = 0
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) {
        transparentPixels++
      }
    }

    const totalPixels = (canvas.offsetWidth * canvas.offsetHeight) / (4 * 4)
    const percentage = transparentPixels / totalPixels

    if (percentage > 0.4) {
      revealCard()
    }
  }

  const revealCard = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
    setIsRevealed(true)
    onRevealed(id)
  }

  return (
    <div className="relative h-64 rounded-lg overflow-hidden shadow-2xl">
      {/* Hidden content - revealed when scratched */}
      <div
        className={`absolute inset-0 flex items-end justify-center transition-opacity duration-300 ${
          isRevealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {photo ? (
          <>
            <img
              src={photo}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${colorGradient} opacity-60`} />
            <p className="relative z-10 text-white text-lg font-semibold text-center leading-relaxed p-4 drop-shadow-lg">
              {message}
            </p>
          </>
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${colorGradient} flex items-center justify-center p-6`}>
            <p className="text-white text-xl font-semibold text-center leading-relaxed">
              {message}
            </p>
          </div>
        )}
      </div>

      {/* Scratch layer */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-pointer transition-opacity duration-300 ${
          isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Shine effect */}
      {!isRevealed && (
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-20 pointer-events-none" />
      )}
    </div>
  )
}
