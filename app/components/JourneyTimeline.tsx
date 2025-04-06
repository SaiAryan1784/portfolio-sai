"use client"
import React from 'react';
import { motion } from 'framer-motion';

const JourneyTimeline = () => {
  const journeyPoints = [
    {
      year: "2021",
      title: "Started Web Development",
      description: "Began learning HTML, CSS, and JavaScript fundamentals",
      icon: "🚀", // You can replace with any emoji or icon component
      tech: ["HTML", "CSS", "JavaScript"]
    },
    {
      year: "2022",
      title: "Frontend Frameworks",
      description: "Explored React ecosystem and built my first web applications",
      icon: "⚛️",
      tech: ["React", "Redux", "TypeScript"]
    },
    {
      year: "2023",
      title: "Full Stack Development",
      description: "Expanded to backend development and database management",
      icon: "🔄",
      tech: ["Node.js", "MongoDB", "Express"]
    },
    {
      year: "2024",
      title: "Advanced UI/UX",
      description: "Focused on creating seamless user experiences and animations",
      icon: "✨",
      tech: ["Framer Motion", "Tailwind", "Figma"]
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <h3 className="text-3xl font-semibold text-center mb-10 text-[#e4e0e0]">My Journey</h3>
      
      <motion.div 
        className="relative"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Vertical timeline line */}
        <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] h-full w-1 bg-gradient-to-b from-[#e4e0e0] to-transparent" />
        
        {journeyPoints.map((point, index) => (
          <motion.div 
            key={point.year}
            className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} mb-16 relative`}
            variants={item}
          >
            {/* Year marker */}
            <div className="absolute left-[-15px] md:left-1/2 transform md:translate-x-[-50%] w-8 h-8 rounded-full bg-[#e4e0e0] text-[#1f1e1e] flex items-center justify-center z-10">
              {point.icon}
            </div>
            
            {/* Year */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 text-right' : 'md:pl-12 text-left'} mb-4 md:mb-0`}>
              <span className="text-2xl font-bold text-[#e4e0e0]">{point.year}</span>
            </div>
            
            {/* Content */}
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-12 text-left' : 'md:pr-12 text-right'}`}>
              <div className="bg-[#2a2929] p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-medium text-[#e4e0e0] mb-2">{point.title}</h4>
                <p className="text-[#e4e0e0] opacity-80 mb-4">{point.description}</p>
                <div className="flex flex-wrap gap-2 justify-start">
                  {point.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-[#1f1e1e] text-[#e4e0e0] rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
export default JourneyTimeline;