"use client"
import React from 'react'
import { motion } from 'framer-motion'
import GitHubStats from '../components/GithubStats'

const About = () => {
  // Divide your skills into groups for separate cards.
  const skills = [
    ["JavaScript", "React", "Node.js", "TypeScript", "Redux"],
    ["CSS", "HTML", "Tailwind CSS", "Figma", "Canva"],
    ["Git", "REST APIs", "MongoDB", "SQL", "Firebase"],
    ["Express.js", "Postman", "React Testing Library", "Vercel"],
  ];

  return (
    <div id="about" className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-4xl font-bold mb-4">About Me</h2>
        <p className="text-lg max-w-2xl mb-8">
          I am a passionate developer with a love for creating innovative solutions. I enjoy working with the latest technologies and continuously learning to improve my skills.
        </p>
      </div>
      
      <div className="w-full max-w-4xl">
        <h3 className="text-2xl font-semibold text-center mb-6">My Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((group, index) => (
            <motion.div 
              key={index}
              className="p-4 border border-gray-200 rounded-lg shadow-sm"
              whileHover={{ x: 10, scale: 1.02, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ul className="space-y-2">
                {group.map((skill, idx) => (
                  <motion.li 
                    key={idx}
                    className="bg-white p-2 rounded-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-12">
        <GitHubStats />
      </div>
    </div>
  )
}

export default About