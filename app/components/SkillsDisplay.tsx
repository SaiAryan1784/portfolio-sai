"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillsDisplay = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  
  // Group skills by category - keeping your original data
  const skillCategories = {
    frontend: {
      title: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "TypeScript", level: 80 },
        { name: "Redux", level: 75 },
        { name: "HTML", level: 95 },
        { name: "CSS", level: 85 },
        { name: "Tailwind CSS", level: 80 },
      ]
    },
    backend: {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 80 },
        { name: "Express.js", level: 75 },
        { name: "MongoDB", level: 70 },
        { name: "SQL", level: 65 },
        { name: "REST APIs", level: 85 },
        { name: "Firebase", level: 70 },
      ]
    },
    tools: {
      title: "Tools",
      skills: [
        { name: "Git", level: 85 },
        { name: "Figma", level: 75 },
        { name: "Canva", level: 80 },
        { name: "Postman", level: 85 },
        { name: "Vercel", level: 75 },
        { name: "React Testing Library", level: 70 },
      ]
    }
  };

  // Sort skills by level for better visualization
  Object.keys(skillCategories).forEach(category => {
    skillCategories[category].skills.sort((a, b) => b.level - a.level);
  });

  // Custom color mapping for different skill levels
  const getColorClass = (level) => {
    if (level >= 90) return "bg-emerald-500";
    if (level >= 80) return "bg-teal-500";
    if (level >= 70) return "bg-blue-500";
    if (level >= 60) return "bg-indigo-500";
    return "bg-violet-500";
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <h3 className="text-3xl font-semibold text-center mb-10 text-[#e4e0e0]">My Skills</h3>
      
      {/* Category Selector */}
      <div className="flex justify-center mb-8 space-x-4 flex-wrap gap-y-3">
        {Object.keys(skillCategories).map((category) => (
          <motion.button
            key={category}
            className={`px-6 py-2 rounded-full text-lg font-medium transition-colors ${
              activeCategory === category 
                ? 'bg-[#e4e0e0] text-[#1f1e1e]' 
                : 'bg-transparent text-[#e4e0e0] border border-[#e4e0e0]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category)}
          >
            {skillCategories[category].title}
          </motion.button>
        ))}
      </div>
      
      {/* Skills Display Container */}
      <div className="bg-[#2a2929] rounded-xl p-6 shadow-lg">
        <h4 className="text-xl font-medium text-[#e4e0e0] mb-6">
          {skillCategories[activeCategory].title} Expertise
        </h4>
        
        {/* Skills Progress Bars */}
        <div className="space-y-6">
          <AnimatedSkills skills={skillCategories[activeCategory].skills} getColorClass={getColorClass} />
        </div>
      </div>
    </div>
  );
};

// Separate component for animating skill bars
const AnimatedSkills = ({ skills, getColorClass }) => {
  return (
    <motion.div 
      className="space-y-5"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { 
            staggerChildren: 0.1
          }
        }
      }}
    >
      {skills.map((skill) => (
        <motion.div 
          key={skill.name}
          className="space-y-2"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring",
                stiffness: 300,
                damping: 24
              }
            }
          }}
        >
          <div className="flex justify-between">
            <span className="text-lg font-medium text-[#e4e0e0]">{skill.name}</span>
            <span className="text-[#e4e0e0] opacity-80">{skill.level}%</span>
          </div>
          <div className="w-full bg-[#1f1e1e] rounded-full h-3">
            <motion.div 
              className={`h-3 rounded-full ${getColorClass(skill.level)}`}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillsDisplay;