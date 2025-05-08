
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Github, Linkedin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Embers from '@/components/Embers';
import SmokyOverlay from '@/components/SmokyOverlay';

const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Initialize laser animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Laser animation parameters
    const lasers: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      alpha: number;
      width: number;
      progress: number;
      speed: number;
      color: string;
    }> = [];

    // Enhanced laser creation with more variety but less aggressive
    const createLaser = () => {
      // Only create lasers when the component is mounted
      if (!canvasRef.current) return;

      // Determine laser start position
      const startPos = Math.floor(Math.random() * 4); 
      let startX, startY;
      
      switch(startPos) {
        case 0: // bottom
          startX = Math.random() * canvas.width;
          startY = canvas.height + 10;
          break;
        case 1: // left
          startX = -10;
          startY = Math.random() * canvas.height;
          break;
        case 2: // right
          startX = canvas.width + 10;
          startY = Math.random() * canvas.height;
          break;
        default: // random
          startX = Math.random() * canvas.width;
          startY = Math.random() * canvas.height;
      }

      // Target positions should be around contact icons if they exist
      const contactsElement = contactsRef.current;
      let targetX, targetY;
      if (contactsElement) {
        const rect = contactsElement.getBoundingClientRect();
        targetX = rect.left + Math.random() * rect.width;
        targetY = rect.top + Math.random() * rect.height;
      } else {
        targetX = Math.random() * canvas.width;
        targetY = Math.random() * canvas.height * 0.7; 
      }

      // More variety in colors and appearances
      const colors = [
        'rgba(139, 0, 0, 0.6)',    // Maroon
        'rgba(255, 0, 0, 0.6)',    // Red
        'rgba(220, 20, 60, 0.6)',  // Crimson
      ];

      lasers.push({
        x: startX,
        y: startY,
        targetX,
        targetY,
        alpha: 0.1 + Math.random() * 0.5,
        width: 1 + Math.random() * 2,
        progress: 0,
        speed: 0.003 + Math.random() * 0.015,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    };

    // Create initial lasers - reduced number
    for (let i = 0; i < 5; i++) {
      createLaser();
    }

    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw lasers
      for (let i = 0; i < lasers.length; i++) {
        const laser = lasers[i];
        laser.progress += laser.speed;
        if (laser.progress > 1) {
          // Remove completed laser and create a new one
          lasers.splice(i, 1);
          createLaser();
          i--;
          continue;
        }

        // Calculate current position along the path
        const currentX = laser.x + (laser.targetX - laser.x) * laser.progress;
        const currentY = laser.y + (laser.targetY - laser.y) * laser.progress;

        // Draw laser with enhanced glow effect
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(laser.x, laser.y);
        ctx.lineTo(currentX, currentY);

        // Create gradient for the beam
        const gradient = ctx.createLinearGradient(laser.x, laser.y, currentX, currentY);
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
        gradient.addColorStop(0.5, laser.color);
        gradient.addColorStop(1, 'rgba(255, 30, 30, 0.7)');
        ctx.strokeStyle = gradient;
        ctx.lineWidth = laser.width;
        ctx.globalAlpha = laser.alpha * (1 - Math.abs(0.5 - laser.progress) * 1.5);
        ctx.stroke();

        // Add a glow effect
        ctx.beginPath();
        ctx.moveTo(laser.x, laser.y);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.2)';
        ctx.lineWidth = laser.width * 3;
        ctx.globalAlpha = laser.alpha * 0.3;
        ctx.stroke();
        
        ctx.restore();
      }

      // Create intersecting beams occasionally - less frequently
      if (Math.random() < 0.01 && lasers.length < 12) {
        createLaser();
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="bg-infernal-charcoal text-white min-h-screen overflow-hidden relative">
      {/* Background effects */}
      <SmokyOverlay opacity={0.25} />
      <Embers count={40} density="low" />
      
      {/* Laser animation canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        style={{ zIndex: 1 }} 
      />
      
      <section className="relative min-h-screen py-20 flex items-center justify-center">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={cn(
              "font-cinzel text-5xl md:text-6xl mb-4 demonic-shadow",
              isVisible ? "animate-summon" : "opacity-0 translate-y-4"
            )}>
              More Closer
            </h2>
            
            <div className={cn(
              "mt-8 mb-12 text-xl",
              isVisible ? "animate-summon" : "opacity-0 translate-y-4"
            )} 
            style={{ animationDelay: "0.3s" }}>
              <p className="font-pirata text-infernal-lava mb-8">
                "Whispers reach me through the veil... Choose your method of summoning."
              </p>
            </div>
            
            {/* Social contact icons - YouTube removed */}
            <div 
              ref={contactsRef}
              className={cn(
                "flex flex-row justify-center items-center gap-12 pt-12 pb-16 px-8 max-w-3xl mx-auto",
                isVisible ? "animate-summon" : "opacity-0 translate-y-4"
              )} 
              style={{ animationDelay: "0.6s" }}
            >
              <a href="https://github.com/fataakasyara" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:scale-110">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-900/50 rounded-full blur-lg group-hover:blur-xl group-hover:scale-125 transition-all duration-700"></div>
                  <div className="bg-infernal-charcoal p-6 rounded-full border-2 border-infernal-blood relative z-10 group-hover:bg-black transition-colors duration-300">
                    <Github className="w-12 h-12 text-infernal-lava" />
                  </div>
                </div>
                <span className="font-cinzel text-xl tracking-wide">Github</span>
              </a>
              
              <a href="https://linkedin.com/in/kasyara" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center gap-4 transition-all duration-500 hover:scale-110">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-900/50 rounded-full blur-lg group-hover:blur-xl group-hover:scale-125 transition-all duration-700"></div>
                  <div className="bg-infernal-charcoal p-6 rounded-full border-2 border-infernal-blood relative z-10 group-hover:bg-black transition-colors duration-300">
                    <Linkedin className="w-12 h-12 text-infernal-lava" />
                  </div>
                </div>
                <span className="font-cinzel text-xl tracking-wide">Linkedin</span>
              </a>
            </div>
            
            {/* Personal note */}
            <div className={cn(
              "max-w-2xl mx-auto mt-16 font-pirata text-lg text-gray-300 italic opacity-80",
              isVisible ? "animate-summon" : "opacity-0 translate-y-4"
            )} 
            style={{ animationDelay: "0.9s" }}>
              <p>
                "Every cursed creation you see here… was born from a mind wandering between code and chaos. I am Fataa Kasyara – The Hellbound Architect. This is not just a portfolio. This is a gate. Welcome to my side of creation."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Navigation />
      <Footer />
    </div>
  );
};

export default ContactPage;
