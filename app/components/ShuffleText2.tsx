'use client'
import { useState, useRef, useEffect } from 'react'
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

const ShuffleText2 = ({ text, className }: ShuffleTextProps) => {
  // Initialize display text as an array of empty strings.
  const [displayText, setDisplayText] = useState<string[]>([])
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])
  const intervalsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    // Clear previous timers if text changes.
    clearAllTimers()
    // Create an empty array for display text with the same length as input text.
    setDisplayText(Array(text.length).fill(''))

    // For each character, schedule its animation with a delay (typewriter effect)
    text.split('').forEach((char, index) => {
      const timeout = setTimeout(() => {
        // For spaces, just update immediately.
        if (char === ' ') {
          setDisplayText(prev => {
            const newArr = [...prev]
            newArr[index] = ' '
            return newArr
          })
          return
        }
        // Set up shuffling animation:
        let shuffles = 0
        const numShuffles = 5  // Total times the letter will shuffle
        const shuffleInterval = 80  // Time between shuffles in ms

        const interval = setInterval(() => {
          shuffles++
          setDisplayText(prev => {
            const newArr = [...prev]
            newArr[index] = getRandomHindiChar()
            return newArr
          })

          // When shuffling is done, clear the interval and set the original character
          if (shuffles >= numShuffles) {
            clearInterval(interval)
            setDisplayText(prev => {
              const newArr = [...prev]
              newArr[index] = char
              return newArr
            })
          }
        }, shuffleInterval)
        intervalsRef.current.push(interval)
      }, index * 300) // Each letter begins after 300ms delay from the previous one
      timeoutsRef.current.push(timeout)
    })

    // Cleanup timers on unmount or when text changes.
    return () => {
      clearAllTimers()
    }
  }, [text])

  // Clear all active timeouts and intervals
  const clearAllTimers = () => {
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
    timeoutsRef.current = []
    intervalsRef.current.forEach(interval => clearInterval(interval))
    intervalsRef.current = []
  }

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className={className}
    >
      {displayText.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.3
            }
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default ShuffleText2