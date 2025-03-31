'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

// Hindi characters for shuffling
const hindiCharacters = 'अआइईउऊऋएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसह'

// Helper function to get a random Hindi character
const getRandomHindiChar = () => {
  const randomIndex = Math.floor(Math.random() * hindiCharacters.length)
  return hindiCharacters[randomIndex]
}

interface ShuffleTextProps {
  text: string
  className?: string
}

const ShuffleText = ({ text, className }: ShuffleTextProps) => {
  const [displayText, setDisplayText] = useState(text.split(''))
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  // Clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []
  }

  const handleMouseEnter = () => {
    clearAllTimeouts()

    // Shuffle text to random Hindi characters
    const shuffledArray = text.split('').map(ch =>
      ch !== ' ' ? getRandomHindiChar() : ' '
    )
    setDisplayText(shuffledArray)

    // Restore original text one character at a time
    for (let i = 0; i < text.length; i++) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => {
          const newArr = [...prev]
          newArr[i] = text[i]
          return newArr
        })
      }, i * 150) // Adjust timing as needed
      timeoutsRef.current.push(timeout)
    }
  }

  const handleMouseLeave = () => {
    clearAllTimeouts()
    setDisplayText(text.split(''))
  }

  return (
    <motion.span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 500 }}
      className={className}
    >
      {displayText.map((char, index) => (
        <span key={index}>{char}</span>
      ))}
    </motion.span>
  )
}

export default ShuffleText