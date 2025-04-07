"use client"
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Define proper type interfaces
interface Skill extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  group: string;
  level: number;
  links: string[];
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimulationLink extends d3.SimulationLinkDatum<Skill> {
  source: Skill | string;
  target: Skill | string;
}

const SkillMatrix = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  
  // Skills data with relationships
  const skills: Skill[] = [
    { id: "js", name: "JavaScript", group: "frontend", level: 85, 
      links: ["react", "node", "ts"] },
    { id: "react", name: "React", group: "frontend", level: 90, 
      links: ["redux", "tailwind"] },
    { id: "ts", name: "TypeScript", group: "frontend", level: 80, 
      links: ["react"] },
    { id: "redux", name: "Redux", group: "frontend", level: 75, 
      links: [] },
    { id: "html", name: "HTML", group: "frontend", level: 95, 
      links: ["css"] },
    { id: "css", name: "CSS", group: "frontend", level: 85, 
      links: ["tailwind"] },
    { id: "tailwind", name: "Tailwind", group: "frontend", level: 80, 
      links: [] },
    
    { id: "node", name: "Node.js", group: "backend", level: 80, 
      links: ["express", "mongodb"] },
    { id: "express", name: "Express", group: "backend", level: 75, 
      links: ["rest"] },
    { id: "mongodb", name: "MongoDB", group: "backend", level: 70, 
      links: [] },
    { id: "sql", name: "SQL", group: "backend", level: 65, 
      links: [] },
    { id: "rest", name: "REST APIs", group: "backend", level: 85, 
      links: [] },
    { id: "firebase", name: "Firebase", group: "backend", level: 70, 
      links: [] },
    
    { id: "git", name: "Git", group: "tools", level: 85, 
      links: [] },
    { id: "figma", name: "Figma", group: "tools", level: 75, 
      links: ["canva"] },
    { id: "canva", name: "Canva", group: "tools", level: 80, 
      links: [] },
    { id: "postman", name: "Postman", group: "tools", level: 85, 
      links: ["rest"] },
    { id: "vercel", name: "Vercel", group: "tools", level: 75, 
      links: [] },
    { id: "testing", name: "Testing", group: "tools", level: 70, 
      links: [] },
  ];
  
  // Color mapping for groups
  const groupColors: Record<string, string> = {
    frontend: "#60A5FA", // blue-400
    backend: "#34D399",  // emerald-400
    tools: "#F472B6"     // pink-400
  };
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Create links array from skills data
    const links: SimulationLink[] = [];
    skills.forEach(skill => {
      skill.links.forEach(targetId => {
        links.push({
          source: skill.id,
          target: targetId
        });
      });
    });
    
    // Setup dimensions
    const width = svgRef.current.clientWidth;
    const height = 400;
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width/2, -height/2, width, height]);

    // Create force simulation
    const simulation = d3.forceSimulation<Skill>(skills)
      .force("link", d3.forceLink<Skill, SimulationLink>(links).id((d: Skill) => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      .force("collision", d3.forceCollide().radius((d) => ((d as Skill).level / 10) + 15));

    // Draw links
    const link = svg.append("g")
      .selectAll<SVGLineElement, SimulationLink>("line")
      .data(links)
      .join("line")
      .attr("stroke", "#ffffff33")
      .attr("stroke-width", 1.5);

    // Create node groups for each skill
    const node = svg.append("g")
      .selectAll<SVGGElement, Skill>("g")
      .data(skills)
      .join("g")
      .call(drag(simulation))
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
    
    // Add circles for each node
    node.append("circle")
      .attr("r", d => ((d as Skill).level / 12) + 8)
      .attr("fill", d => groupColors[d.group])
      .attr("stroke", "#ffffff")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.8);
    
    // Add text labels for nodes
    node.append("text")
      .text(d => d.name)
      .attr("x", 0)
      .attr("y", d => (d.level / 12) + 16)
      .attr("text-anchor", "middle")
      .attr("fill", "#e4e0e0")
      .attr("font-size", "10px");
    
    // Create a properly typed drag behavior
    function drag(simulation: d3.Simulation<Skill, undefined>) {
      return d3.drag<SVGGElement, Skill>()
        .on("start", (event: d3.D3DragEvent<SVGGElement, Skill, Skill>, d: Skill) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event: d3.D3DragEvent<SVGGElement, Skill, Skill>, d: Skill) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event: d3.D3DragEvent<SVGGElement, Skill, Skill>, d: Skill) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }
    
    // Tick function for simulation
    simulation.on("tick", () => {
      link
        .attr("x1", d => {
          const source = d.source as Skill;
          return source.x !== undefined ? source.x : 0;
        })
        .attr("y1", d => {
          const source = d.source as Skill;
          return source.y !== undefined ? source.y : 0;
        })
        .attr("x2", d => {
          const target = d.target as Skill;
          return target.x !== undefined ? target.x : 0;
        })
        .attr("y2", d => {
          const target = d.target as Skill;
          return target.y !== undefined ? target.y : 0;
        });
      
      node.attr("transform", d => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });
    
    // Hover effects
    function handleMouseOver(this: SVGGElement, event: MouseEvent, d: Skill) {
      // Highlight the current node
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", d => ((d as Skill).level / 12) + 12)
        .attr("opacity", 1);
      
      // Highlight connected links and nodes
      link
        .transition()
        .duration(200)
        .attr("stroke", l => {
          const source = typeof l.source === 'object' ? l.source.id : l.source;
          const target = typeof l.target === 'object' ? l.target.id : l.target;
          return (source === d.id || target === d.id) ? "#ffffff" : "#ffffff33";
        })
        .attr("stroke-width", l => {
          const source = typeof l.source === 'object' ? l.source.id : l.source;
          const target = typeof l.target === 'object' ? l.target.id : l.target;
          return (source === d.id || target === d.id) ? 2.5 : 1.5;
        });
      
      // Show tooltip
      if (svgRef.current?.parentNode) {
        d3.select(svgRef.current.parentNode as HTMLElement)
          .append("div")
          .attr("class", "tooltip")
          .style("position", "absolute")
          .style("background", "#1f1e1e")
          .style("color", "#e4e0e0")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("font-size", "14px")
          .style("pointer-events", "none")
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 20) + "px")
          .html(`<strong>${d.name}</strong><br>Level: ${d.level}%<br>Group: ${d.group}`);
      }
    }
    
    function handleMouseOut(this: SVGGElement) {
      // Reset node highlight
      d3.select(this).select("circle")
        .transition()
        .duration(200)
        .attr("r", d => ((d as Skill).level / 12) + 8)
        .attr("opacity", 0.8);
      
      // Reset links
      link
        .transition()
        .duration(200)
        .attr("stroke", "#ffffff33")
        .attr("stroke-width", 1.5);
      
      // Remove tooltip
      d3.select(".tooltip").remove();
    }
    
    // Cleanup on unmount
    return () => {
      simulation.stop();
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <h3 className="text-3xl font-semibold text-center mb-6 text-[#e4e0e0]">Skill Connections</h3>
      <p className="text-center text-[#e4e0e0] opacity-80 mb-8 max-w-2xl mx-auto">
        An interactive map showing how my technical skills interrelate
      </p>
      
      <div className="bg-[#2a2929] rounded-xl p-6 shadow-lg">
        <div className="flex justify-center gap-6 mb-4">
          {Object.entries(groupColors).map(([group, color]) => (
            <div key={group} className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }}></div>
              <span className="text-[#e4e0e0] capitalize">{group}</span>
            </div>
          ))}
        </div>
        
        <div className="w-full relative overflow-hidden">
          <svg ref={svgRef} className="w-full"></svg>
          <div className="text-center mt-2 text-sm text-[#e4e0e0] opacity-70">
            Drag nodes to interact • Circle size indicates proficiency
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillMatrix;