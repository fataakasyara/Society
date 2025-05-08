
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Embers from '@/components/Embers';
import SmokyOverlay from '@/components/SmokyOverlay';
import { Flame } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ComponentType<any>;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Nolyx Society",
    description: "Web3 and blockchain community website and AI",
    technologies: ["JavaScript", "AI", "Tailwind CSS"],
    icon: Flame
  },
  {
    id: 2,
    title: "Jenjang ID",
    description: "Securing jenjang website",
    technologies: ["BurpSuite", "IDOR", "XSS"],
    icon: Flame
  },
  {
    id: 3,
    title: "Fluent Fellas",
    description: "Website for learning fluent in English",
    technologies: ["React", "Supabase", "Tailwind CSS"],
    icon: Flame
  },
  {
    id: 4,
    title: "Car Rent",
    description: "Car rental website full rent and transaction feature",
    technologies: ["PHP", "MySQL", "Tailwind CSS"],
    icon: Flame
  }
];

const ProjectsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0
  });
  const [animatedLetters, setAnimatedLetters] = useState<string[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsVisible(true);

    // New animation for title letters 
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

    // Track cursor position for effects
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Handle card hover with 3D effect
  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, id: number, index: number) => {
    if (!projectRefs.current[index]) return;
    const card = projectRefs.current[index];
    const rect = card?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    if (card) {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.transition = 'transform 0.1s ease';
    }
    setHoveredProject(id);
  };

  const handleCardLeave = (index: number) => {
    const card = projectRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    }
    setHoveredProject(null);
  };

  // Generate embers effect
  const renderEmbers = (count: number) => {
    return Array.from({
      length: count
    }).map((_, i) => {
      const delay = Math.random() * 5;
      const duration = 3 + Math.random() * 4;
      const size = 3 + Math.random() * 4;
      return <div key={i} className="absolute rounded-full bg-infernal-lava opacity-70 animate-ember-float" style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        boxShadow: '0 0 8px 2px rgba(255, 69, 0, 0.7)'
      }} />;
    });
  };

  // Handle project click for detailed view
  const handleProjectClick = (id: number) => {
    setActiveProject(activeProject === id ? null : id);
  };

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* Ambient effects */}
      <SmokyOverlay opacity={0.3} />
      <Embers count={50} density="medium" />
      
      {/* Custom cursor follower for mystical effect */}
      <div className="fixed w-12 h-12 rounded-full pointer-events-none mix-blend-screen z-10 opacity-50 hidden md:block" style={{
        background: 'radial-gradient(circle, rgba(255,69,0,0.8) 0%, rgba(255,0,0,0.5) 40%, rgba(0,0,0,0) 70%)',
        transform: `translate(${cursorPosition.x - 24}px, ${cursorPosition.y - 24}px)`,
        transition: 'transform 0.1s ease-out',
        boxShadow: '0 0 20px 10px rgba(255, 0, 0, 0.2)'
      }} />
      
      <div className="container mx-auto px-4 py-20 z-10 relative">
        <header className={cn("max-w-4xl mx-auto text-center mb-12", isVisible ? "animate-summon" : "opacity-0")}>
          <h1 className="font-cinzel text-5xl md:text-7xl mb-6 relative h-16 md:h-24">
            {animatedLetters.map((letter, index) => (
              <span 
                key={index} 
                className="relative inline-block text-gradient-infernal"
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
          </h1>
          <p className="text-xl italic font-pirata opacity-80 mt-4">
            "Forged in chaos. Designed for eternity."
          </p>
          
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
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className={cn(
                "relative transform transition-all duration-700 cursor-pointer",
                isVisible ? "animate-summon" : "opacity-0",
                activeProject === project.id ? "md:col-span-2" : ""
              )}
              style={{
                animationDelay: `${0.2 + index * 0.1}s`
              }}
              onMouseMove={e => handleCardHover(e, project.id, index)}
              onMouseLeave={() => handleCardLeave(index)}
              onClick={() => handleProjectClick(project.id)}
            >
              {/* The cursed artifact card */}
              <div 
                className={cn(
                  "relative overflow-hidden rounded-lg border-2 transition-all duration-500 h-full",
                  hoveredProject === project.id || activeProject === project.id ? 
                    "border-infernal-lava/70 shadow-[0_0_15px_rgba(255,69,0,0.6)]" : 
                    "border-infernal-crimson/30",
                  activeProject === project.id ? "bg-black/70" : "bg-black/40"
                )}
              >
                {/* Summon flames on hover */}
                <div className={cn(
                  "absolute inset-0 opacity-0 transition-opacity duration-1000",
                  hoveredProject === project.id && "opacity-30"
                )}>
                  {renderEmbers(15)}
                </div>
                
                <div className="p-6 relative z-10">
                  {/* Header with mystical icon */}
                  <div className="flex items-center mb-4 space-x-3">
                    <div className={cn(
                      "p-2 rounded-full transition-all duration-500",
                      hoveredProject === project.id || activeProject === project.id ? 
                        "bg-gradient-to-br from-infernal-blood to-infernal-lava text-white" : 
                        "bg-infernal-charcoal text-infernal-blood"
                    )}>
                      <Flame size={24} />
                    </div>
                    <h2 className={cn(
                      "font-cinzel text-xl md:text-2xl transition-colors duration-500",
                      hoveredProject === project.id || activeProject === project.id ? 
                        "text-infernal-lava" : "text-white"
                    )}>
                      {project.title}
                    </h2>
                  </div>
                  
                  {/* Project description */}
                  <p className="text-gray-300 mb-6">{project.description}</p>
                  
                  {/* Technology runes */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className={cn(
                          "px-3 py-1 text-xs rounded-full transition-all duration-500",
                          hoveredProject === project.id || activeProject === project.id ? 
                            "bg-infernal-blood text-white" : 
                            "bg-infernal-charcoal border border-infernal-crimson/30 text-gray-300"
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Expanded content */}
                  <div className={cn(
                    "transition-all duration-700 overflow-hidden",
                    activeProject === project.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="border-t border-infernal-crimson/30 pt-6 mt-2">                      
                      {/* Action button */}
                      <div className="mt-8 text-center">
                        <button className="burning-btn group inline-flex items-center space-x-2">
                          <span className="relative z-10">VISIT</span>
                          <Flame 
                            className="w-5 h-5 group-hover:animate-pulse-glow" 
                            style={{
                              filter: 'drop-shadow(0 0 5px rgba(255, 69, 0, 0.8))'
                            }} 
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover instruction */}
                  <div className={cn(
                    "absolute bottom-4 right-4 text-xs italic transition-opacity duration-300",
                    activeProject === project.id ? "opacity-0" : "opacity-60"
                  )}>
                    Click to reveal secrets...
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Navigation />
      <Footer />
    </div>
  );
};

export default ProjectsPage;
