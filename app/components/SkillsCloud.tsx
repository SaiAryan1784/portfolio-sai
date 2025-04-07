"use client"
import React, { useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';

const SkillCloud = () => {
  // Skill groups with visual styling
  const skillGroups = [
    {
      category: "Frontend",
      skills: ["React", "JavaScript", "TypeScript", "Redux", "HTML", "CSS", "Tailwind"],
      color: "#60A5FA" // blue-400
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB", "SQL", "REST APIs", "Firebase"],
      color: "#34D399" // emerald-400
    },
    {
      category: "Tools",
      skills: ["Git", "Figma", "Canva", "Postman", "Vercel", "Testing"],
      color: "#F472B6" // pink-400
    }
  ];

  const cloudRef = useRef<HTMLDivElement | null>(null);
  const radius = 180; // Cloud radius
  // const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (!cloudRef.current) return;
    
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let speed = 0.5;
    
    // Extract all skills into a single flat array
    const allSkills = skillGroups.flatMap(group => 
      group.skills.map(skill => ({
        text: skill,
        color: group.color,
        size: Math.random() * 0.6 + 0.8, // Random size for variety
        // Calculate random position on sphere
        theta: Math.random() * Math.PI * 2, // longitude
        phi: Math.acos((Math.random() * 2) - 1), // latitude
      }))
    );
    
    // Handle mouse move for interactive rotation
    interface MouseEventWithClient extends MouseEvent {
      clientX: number;
      clientY: number;
    }

    const handleMouseMove = (e: MouseEventWithClient): void => {
      if (!cloudRef.current) return;
      const rect = cloudRef.current.getBoundingClientRect();
      mouseX = (e.clientX - (rect.left + rect.width / 2)) * 0.01;
      mouseY = (e.clientY - (rect.top + rect.height / 2)) * 0.01;
      speed = 0.05; // Slow down when user is interacting
    };

    // Handle touch events for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!cloudRef.current) return;
      if (!e.touches[0]) return;
      const rect = cloudRef.current.getBoundingClientRect();
      mouseX = (e.touches[0].clientX - (rect.left + rect.width / 2)) * 0.01;
      mouseY = (e.touches[0].clientY - (rect.top + rect.height / 2)) * 0.01;
      speed = 0.05;
    };

    // Reset speed when not interacting
    const handleMouseLeave = () => {
      speed = 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Animation loop for rotating the cloud
    const animate = () => {
      // Update positions
      allSkills.forEach(skill => {
        skill.theta += speed * 0.01;
        
        // Convert spherical to cartesian coordinates
        const x = radius * Math.sin(skill.phi) * Math.cos(skill.theta);
        const y = radius * Math.sin(skill.phi) * Math.sin(skill.theta);
        const z = radius * Math.cos(skill.phi);
        
        // Calculate 3D to 2D projection with mouse influence
        const scale = 1 / (z / radius + 2); // Perspective scale
        const tx = x + mouseY * 50; // Add slight mouse influence
        const ty = y - mouseX * 50;
        
        // Find or create DOM element
        let el = document.getElementById(`skill-${skill.text}`);
        if (!el) {
          el = document.createElement('div');
          el.id = `skill-${skill.text}`;
          el.className = 'absolute transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap transition-colors duration-300';
          el.innerText = skill.text;
          if (cloudRef.current) {
            cloudRef.current.appendChild(el);
          }
        }
        
        // Apply transforms
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale * skill.size})`;
        el.style.opacity = `${scale}`;
        el.style.color = skill.color;
        el.style.zIndex = Math.floor(scale * 1000).toString();
        el.style.fontWeight = scale > 0.7 ? 'bold' : 'normal';
        el.style.fontSize = `${16 + (scale * 8)}px`;
      });
      
      rafId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      // Clean up DOM elements
      if (cloudRef.current) {
        while (cloudRef.current.firstChild) {
          cloudRef.current.removeChild(cloudRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <h3 className="text-3xl font-semibold text-center mb-8 text-[#e4e0e0]">Tech Stack</h3>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {skillGroups.map((group) => (
          <div key={group.category} className="flex items-center">
            <div 
              className="w-4 h-4 rounded-full mr-2" 
              style={{ backgroundColor: group.color }}
            ></div>
            <span className="text-[#e4e0e0]">{group.category}</span>
          </div>
        ))}
      </div>
      
      <div 
        ref={cloudRef}
        className="relative w-full h-96 mx-auto" 
        style={{ 
          perspective: '1000px',
          perspectiveOrigin: 'center center'
        }}
      />
      
      <div className="text-center mt-4 text-[#e4e0e0] opacity-70">
        <p>Hover over the cloud to interact</p>
      </div>
    </div>
  );
};

export default SkillCloud;