"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillProjects = () => {
  type SkillCategoryKey = keyof typeof skillCategories;
  const [activeCategory, setActiveCategory] = useState<SkillCategoryKey>('frontend');
  
  type SkillCategory = {
    title: string;
    description: string;
    projects: {
      name: string;
      description: string;
      skills: string[];
    }[];
  };

  type SkillCategories = Record<string, SkillCategory>;
  const skillCategories: SkillCategories = {
    frontend: {
      title: "Frontend and Full Stack projects",
      description: "Creating responsive and interactive user interfaces",
      projects: [
        {
          name: "Proficia",
          description: "Built a responsive web application which generates test of various topics and difficulty levels",
          skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "NextAuth", "PostgreSQL", "Prisma", "Groq", "GenAI"]
        },
        {
          name: "Portfolio",
          description: "Developed a personal portfolio website to showcase my work",
          skills: ["TypeScript", "D3.js", "Framer Motion", "Nextjs", "Tailwind CSS"]
        },
        {
          name:"EMS",
          description : "Developed 3-4 features and improved UI. Project is a web application for managing employee records, including CRUD operations and user authentication. Developed by Blurock Ionic",
          skills: ["React", "JavaScript", "Tailwind CSS", "Redux", "Node.js", "Express", "MongoDB"]
        },
        {
          name: "Marriage Vendors",
          description: "Created a web application for managing marriage vendors, including user authentication and profile management. Developed by Blurock Ionic.Learnt how to use Prisma and PostgreSQL. I was able to various features and improve the UI.",
          skills: ["React", "JavaScript", "Tailwind CSS", "Redux", "Node.js", "Express", "MongoDB", "PostgreSQL", "Prisma"]
        }
      ]
    },
    backend: {
      title: "Python and GenAI projects",
      description: "Designing APIs and managing data flow",
      projects: [
        {
          name: "F1-GPT",
          description: "Chatbot for F1 based Qs and As. It uses OpenAI API and Langchain to generate answers based on the data provided by the user. The data is stored in MongoDB VectorDB. This project uses RAG (Retrieval Augmented Generation) to generate answers.",
          skills: ["Nextjs", "TypeScript", "MongoDB VectorDB", "Groq API inference", "WebScraping", "AI SDK"]
        },
        {
          name: "Proficia Backend",
          description: "Backend part of the proficia project. It uses Streamlit for hosting and ui and Groq API for inference. JSON data is us",
          skills: ["Express.js", "Swagger", "PostgreSQL"]
        }
      ]
    },
    software: {
      title: "Software Engineering",
      description: "Using the right tools to streamline development",
      projects: [
        {
          name: "Remote Diagnostic Tools",
          description: "Diagnostic tool to connect with second device to knows its system characteristics and details remotely. multiple IPs can be stored and worked upon.",
          skills: ["Python", "http", ""]
        },
      ]
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <h3 className="text-3xl font-semibold text-center mb-6 text-[#1f1e1e]">Skills in Action</h3>
      <p className="text-center text-[#1f1e1e] opacity-80 mb-10 max-w-2xl mx-auto">
        Rather than abstract percentages, here&#39;s how I&#39;ve applied my skills in real projects
      </p>
      
      {/* Category Selector */}
      <div className="flex justify-center mb-8 space-x-4 flex-wrap gap-y-3">
        {Object.keys(skillCategories).map((category) => (
          <motion.button
            key={category}
            className={`px-6 py-2 rounded-full text-lg font-medium transition-colors ${
              activeCategory === category 
                ? 'bg-[#1f1e1e] text-[#e4e0e0]' 
                : 'bg-transparent text-[#1f1e1e] border border-[#1f1e1e]'
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
      <div className="bg-[#e4e0e0] rounded-xl p-6 shadow-lg min-h-[320px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-xl font-medium text-[#2a2929] mb-2">
              {skillCategories[activeCategory].title}
            </h4>
            <p className="text-[#2a2929] opacity-80 mb-6">
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
                      <span key={skill} className="px-3 py-1 bg-[#e4e0e0] text-[#2a2929] rounded-full text-sm">
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