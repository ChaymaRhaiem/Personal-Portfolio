"use client"

import { useEffect, useRef } from "react"

export function MatrixBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"

    const createMatrixChar = () => {
      const char = document.createElement("div")
      char.className = "matrix-char"
      char.textContent = chars[Math.floor(Math.random() * chars.length)]
      char.style.left = Math.random() * 100 + "%"
      char.style.animationDelay = Math.random() * 8 + "s"
      char.style.animationDuration = Math.random() * 3 + 5 + "s"
      container.appendChild(char)

      setTimeout(() => {
        if (container.contains(char)) {
          container.removeChild(char)
        }
      }, 8000)
    }

    const interval = setInterval(createMatrixChar, 200)
    return () => clearInterval(interval)
  }, [])

  return <div ref={containerRef} className="matrix-bg" />
}
