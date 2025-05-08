
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Flame } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nolyx Society",
    description: "Web3 and blockchain community website and AI",
    technologies: ["JavaScript", "AI", "Tailwind CSS"]
  },
  {
    id: 2,
    title: "Jenjang ID",
    description: "Securing jenjang website",
    technologies: ["BurpSuite", "IDOR", "XSS"]
  },
  {
    id: 3,
    title: "Fluent Fellas",
    description: "Website for learning fluent in English",
    technologies: ["React", "Supabase", "Tailwind CSS"]
  },
  {
    id: 4,
    title: "Car Rent",
    description: "Car rental website full rent and transaction feature",
    technologies: ["PHP", "MySQL", "Tailwind CSS"]
  }
];

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [laserPosition, setLaserPosition] = useState({ x: 50, y: 50 });
  const [animatedLetters, setAnimatedLetters] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('projects');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Animate title letters with new animation
  useEffect(() => {
    if (!isVisible) return;

    const titleText = "Projects";
    const letters = titleText.split('');
    
    const animateLetters = async () => {
      setAnimatedLetters([]);
      for (let i = 0; i <= letters.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setAnimatedLetters(letters.slice(0, i));
      }
    };

    animateLetters();
  }, [isVisible]);

  // Randomly move laser beam positions
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setLaserPosition({
        x: Math.random() * 100,
        y: Math.random() * 100
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Function to simulate fire burst effect on hover
  const handleTabletHover = (id: number) => {
    setActiveProject(id);
  };

  // Generate random laser beams
  const renderLaserBeams = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const endX = laserPosition.x;
      const endY = laserPosition.y;
      const width = 1 + Math.random() * 2;
      const delay = i * 0.2;
      
      return (
        <div 
          key={i}
          className="absolute h-px bg-infernal-blood animate-pulse-glow"
          style={{
            left: `${startX}%`,
            top: `${startY}%`,
            width: `${width}px`,
            transformOrigin: '0 0',
            transform: `rotate(${Math.atan2(endY - startY, endX - startX) * 180 / Math.PI}deg) scaleX(${Math.hypot(endX - startX, endY - startY) / 10})`,
            opacity: 0.5 + Math.random() * 0.3,
            boxShadow: '0 0 8px 2px rgba(255, 0, 0, 0.7)',
            animationDelay: `${delay}s`,
            zIndex: 0
          }}
        />
      );
    });
  };

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-20 flex items-center bg-black"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-90"></div>
        
        {/* Laser focus point */}
        <div 
          className="absolute w-6 h-6 rounded-full bg-infernal-blood animate-pulse-glow"
          style={{
            left: `${laserPosition.x}%`,
            top: `${laserPosition.y}%`,
            boxShadow: '0 0 15px 5px rgba(255, 0, 0, 0.8)',
            opacity: 0.7,
            zIndex: 1
          }}
        />
        
        {/* Laser beams */}
        {isVisible && renderLaserBeams(15)}
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-cinzel text-4xl md:text-5xl mb-4 demonic-shadow h-12">
            {animatedLetters.map((letter, index) => (
              <span 
                key={index} 
                className="inline-block"
                style={{ 
                  animation: `fadeInUp 0.5s ease forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                {letter}
              </span>
            ))}
          </h2>

          <style>
            {`
              @keyframes fadeInUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                  text-shadow: 0 0 10px rgba(255, 0, 0, 0.7);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                  text-shadow: 0 0 20px rgba(255, 0, 0, 0.9), 0 0 30px rgba(255, 69, 0, 0.6);
                }
              }
            `}
          </style>
          
          <p 
            className={cn(
              "text-lg mb-16 text-gray-200",
              isVisible ? "animate-summon" : "opacity-0 translate-y-4"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            Forged in chaos. Designed for eternity.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  "relative",
                  isVisible ? "animate-summon" : "opacity-0 translate-y-4"
                )}
                style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                onMouseEnter={() => handleTabletHover(project.id)}
                onMouseLeave={() => setActiveProject(null)}
              >
                {/* Stone tablet */}
                <div 
                  className={cn(
                    "infernal-card p-6 h-full border-2 transition-all duration-300",
                    activeProject === project.id ? "border-infernal-blood/50" : "border-infernal-crimson/20"
                  )}
                >
                  {/* Fire burst effect on hover */}
                  {activeProject === project.id && (
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute inset-0 bg-lava-gradient opacity-10 animate-pulse-glow"></div>
                      
                      {/* Cracks */}
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="absolute bg-infernal-blood/30"
                          style={{
                            height: '2px',
                            width: `${20 + Math.random() * 30}%`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                            boxShadow: '0 0 8px rgba(255, 0, 0, 0.5)',
                          }}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Icon - always using Flame */}
                  <div className="flex items-center mb-4 space-x-3">
                    <div className={cn(
                      "p-2 rounded-full transition-all duration-500",
                      activeProject === project.id ? 
                        "bg-gradient-to-br from-infernal-blood to-infernal-lava text-white" : 
                        "bg-infernal-charcoal text-infernal-blood"
                    )}>
                      <Flame size={20} />
                    </div>
                    <h3 className={cn(
                      "font-cinzel text-xl md:text-2xl mb-0 transition-all duration-300",
                      activeProject === project.id ? "text-infernal-blood" : "text-white"
                    )}>
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="mb-6 text-gray-300">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center mt-auto">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-1 text-xs bg-infernal-charcoal border border-infernal-crimson/30 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div 
                    className={cn(
                      "mt-6 text-sm text-center transition-opacity duration-300",
                      activeProject === project.id ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <a href="#" className="lava-underline text-infernal-lava">
                      Click to reveal secrets...
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom fade for better transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default Projects;
