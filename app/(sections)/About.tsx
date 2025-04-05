"use client"
import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import GitHubStats from '../components/GithubStats'
import VerticalScrollingText from '../components/VerticalScrollingText'
import SkillsDisplay from '../components/SkillsDisplay'
import ScrollingText from '../components/ScrollingText'

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState('100vh');

  // *** Using your EXACT original useEffect logic ***
  useEffect(() => {
    if (containerRef.current) {
      const updateHeight = () => {
        // Ensure currentRef is still valid inside the handler
        if (containerRef.current) {
            const height = containerRef.current.scrollHeight;
            setContainerHeight(`${height}px`);
        }
      };

      // Initial update
      updateHeight();

      // Update on resize
      window.addEventListener('resize', updateHeight);

      // Cleanup
      return () => window.removeEventListener('resize', updateHeight);
    }
  }, [])

  return (
    <div 
      id="about" 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1f1e1e] relative"
    >
      {/* Background scrolling text layers with dynamic height */}
      <div 
        className="absolute left-10 pointer-events-none" 
        style={{ height: containerHeight, top: 0, bottom: 0 }}
      >
        <ScrollingText
          text=".CPP .PY .TSX .JSX .JSON .CPP .PY .TSX"
          direction="down"
          fontSize="7rem"
          color="#e4e0e0"
          speed={1}
          containerHeight={containerHeight}
        />
      </div>
      <div 
        className="absolute right-10 pointer-events-none" 
        style={{ height: containerHeight, top: 0 }}
      >
        <VerticalScrollingText
          text="TOML JS TS HTML GROQ"
          direction="up"
          fontSize="8rem"
          color="#e4e0e0"
          speed={2}
          containerHeight={containerHeight}
        />
      </div>
      
      {/* Content remains unchanged from original */}
      <div className="flex flex-col items-center justify-center text-center text-[#e4e0e0] z-10">
        <h2 className="text-5xl font-bold mb-4">About Me</h2>
        <p className="text-xl max-w-3xl mb-8">
          I am a passionate developer with a love for creating innovative solutions. I enjoy working with the latest technologies and continuously learning to improve my skills.
        </p>
      </div>
      
      <SkillsDisplay />
      
      <div className="mt-16">
        <GitHubStats />
      </div>
    </div>
  )
}

export default About