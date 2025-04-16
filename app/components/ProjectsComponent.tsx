"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

// Define types
type Project = {
  name: string;
  description: string;
  skills: string[];
  link?: string;
  github?: string;
};

type Category = {
  id: string;
  title: string;
  description: string;
  projects: Project[];
};

const ProjectsComponent: React.FC = () => {
  // Project data
  const categories: Category[] = [
    {
      id: "frontend",
      title: "Frontend & Full Stack",
      description: "Creating responsive and interactive user interfaces",
      projects: [
        {
          name: "Portfolio",
          description: "Personal portfolio website showcasing my work",
          skills: ["TypeScript", "D3.js", "Framer Motion", "Next.js", "Tailwind CSS"],
          link: "#home",
          github: "https://github.com/SaiAryan1784/portfolio-sai"
        },
        {
          name:"EMS",
          description: "Employee management system with CRUD operations and user authentication. Developed under Blurock Ionic",
          skills: ["React", "JavaScript", "Tailwind CSS", "Redux", "Node.js", "Express", "MongoDB"],
          link: "https://ems-pi-opal.vercel.app/login",
          github: "https://github.com/blurockionic/EMS"
        },
        {
            name:"Marriage Vendors",
            description: "Created a web application for managing marriage vendors, including user authentication and profile management. Developed by Blurock Ionic. Learnt how to use Prisma and PostgreSQL. I was able to various features and improve the UI.",
            skills: ["React", "JavaScript", "Tailwind CSS", "Redux", "Node.js", "Express", "MongoDB", "PostgreSQL", "Prisma"],
            link: "https://www.marriagevendors.com/",
            github: "https://github.com/blurockionic/wedding_frontend"
        }
      ]
    },
    {
      id: "backend",
      title: "GenAI Implementation in Web Development & Python",
      description: "Building intelligent systems and managing data flow",
      projects: [
        {
            name: "Proficia",
            description: "Web application generating tests with various topics and difficulty levels",
            skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "NextAuth", "PostgreSQL", "Prisma", "Groq", "GenAI"],
            link: "https://proficia.vercel.app/",
            github: "https://github.com/SaiAryan1784/proficia"
        },
        {
          name: "F1-GPT",
          description: "F1 chatbot using RAG with vector database integration",
          skills: ["Next.js", "TypeScript", "MongoDB VectorDB", "Groq API", "WebScraping", "AI SDK"],
          github: "https://github.com/SaiAryan1784/f1gpt",
          link: "https://f1gpt-six.vercel.app/"
        },
        {
          name: "Proficia (Python version)",
          description: "Python implementation with streamlit UI for test generation platform",
          skills: ["Python", "Groq", "Streamlit"],
          github: "https://github.com/SaiAryan1784/Proficia-backend",
          link: "https://proficia-backend-sai1784.streamlit.app/"
        }
      ]
    },
    {
      id: "software",
      title: "Software Engineering",
      description: "Building robust tools and applications",
      projects: [
        {
          name: "Remote Diagnostic Tools",
          description: "System for remote device diagnostics and monitoring",
          skills: ["Python", "HTTP", "Networking"],
          github: "https://github.com/SaiAryan1784/RemoteDiagnosticTool_Python"
        }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);

  // Get current category
  const currentCategory = categories.find(cat => cat.id === activeCategory) || categories[0];

  return (
    <div className="w-full max-w-6xl mx-auto py-4 sm:py-8 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 sm:mb-4 text-gray-800">Projects</h2>
      <p className="text-center text-gray-600 mb-4 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
        Here&apos;s how I&apos;ve applied my skills in real-world projects
      </p>
      
      {/* Category Navigation - Responsive with horizontal scroll on mobile */}
      <div className="flex justify-center mb-4 sm:mb-6 overflow-x-auto pb-2 gap-2 sm:gap-3 px-1">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium flex-shrink-0 transition-colors ${
              activeCategory === category.id 
                ? 'bg-gray-800 text-white' 
                : 'bg-white text-gray-800 border border-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.title}
          </motion.button>
        ))}
      </div>
      
      {/* Project Cards - Responsive grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {currentCategory.projects.map((project) => (
            <motion.div 
              key={project.name}
              className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col"
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
            >
              <div className="p-3 sm:p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">{project.name}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <motion.a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={18} />
                      </motion.a>
                    )}
                    {project.link && (
                      <motion.a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-900"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowUpRight size={18} />
                      </motion.a>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm mb-3 line-clamp-2 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 mt-auto">
                  {project.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectsComponent;