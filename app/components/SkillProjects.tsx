"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillProjects = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  
  const skillCategories = {
    frontend: {
      title: "Frontend",
      description: "Creating responsive and interactive user interfaces",
      projects: [
        {
          name: "Proficia",
          description: "Built a responsive web application which generates test of various topics and difficulty levels",
          skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "NextAuth", "PostgreSQL", "Prisma", "Groq", "GenAI"]
        },
        {
          name: "Dashboard Components",
          description: "Created reusable data visualization components",
          skills: ["TypeScript", "D3.js", "Material UI"]
        }
      ]
    },
    backend: {
      title: "Backend",
      description: "Designing APIs and managing data flow",
      projects: [
        {
          name: "Authentication Service",
          description: "Secure user authentication with JWT and OAuth",
          skills: ["Node.js", "Express", "MongoDB"]
        },
        {
          name: "REST API",
          description: "Built RESTful APIs with comprehensive documentation",
          skills: ["Express.js", "Swagger", "PostgreSQL"]
        }
      ]
    },
    tools: {
      title: "Dev Tools",
      description: "Using the right tools to streamline development",
      projects: [
        {
          name: "CI/CD Pipeline",
          description: "Automated testing and deployment workflows",
          skills: ["GitHub Actions", "Jest", "Docker"]
        },
        {
          name: "Design System",
          description: "Created and maintained a component library",
          skills: ["Figma", "Storybook", "Styled Components"]
        }
      ]
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <h3 className="text-3xl font-semibold text-center mb-6 text-[#e4e0e0]">Skills in Action</h3>
      <p className="text-center text-[#e4e0e0] opacity-80 mb-10 max-w-2xl mx-auto">
        Rather than abstract percentages, here's how I've applied my skills in real projects
      </p>
      
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
      
      {/* Content Display */}
      <div className="bg-[#2a2929] rounded-xl p-6 shadow-lg min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-medium text-[#e4e0e0] mb-2">
              {skillCategories[activeCategory].title}
            </h4>
            <p className="text-[#e4e0e0] opacity-80 mb-6">
              {skillCategories[activeCategory].description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories[activeCategory].projects.map(project => (
                <motion.div 
                  key={project.name}
                  className="bg-[#1f1e1e] p-5 rounded-lg"
                  whileHover={{ y: -5 }}
                >
                  <h5 className="text-lg font-medium text-[#e4e0e0] mb-2">{project.name}</h5>
                  <p className="text-[#e4e0e0] opacity-70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-[#2a2929] text-[#e4e0e0] rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
export default SkillProjects;