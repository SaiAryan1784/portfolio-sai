"use client"
import React, { useRef, useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import GitHubStats from '../components/GithubStats'
import VerticalScrollingText from '../components/VerticalScrollingText'
// import SkillsCloud from '../components/SkillsCloud'
// import ScrollingText from '../components/ScrollingText'
import SkillMatrix from '../components/SkillMatrix'
// import SkillProjects from '../components/SkillProjects'
import JourneyTimeline from '../components/JourneyTimeline'

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState('100vh');

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
      
      // Add a small delay to ensure content is fully rendered
      const timeoutId = setTimeout(updateHeight, 500);

      // Cleanup
      return () => {
        window.removeEventListener('resize', updateHeight);
        clearTimeout(timeoutId);
      }
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
        <VerticalScrollingText
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
      
      {/* <SkillsCloud /> */}
      <SkillMatrix />
      <JourneyTimeline/>
      {/* <div className="bottom-0 left-0 w-full text-center pointer-events-none">
        <ScrollingText
          text='git github gitlab bitbucket'
          direction="right"
          fontSize="5rem"
          color="#e4e0e0"
          speed={1}
        />
      </div> */}
      {/* <div className="mt-16">
        <GitHubStats />
      </div> */}
    </div>
  )
}

export default About