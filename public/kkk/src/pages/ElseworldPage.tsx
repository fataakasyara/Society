
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Embers from '@/components/Embers';
import SmokyOverlay from '@/components/SmokyOverlay';

const ElseworldPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showRunes, setShowRunes] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShowRunes(true), 800);
    
    // Add animation for flaming letters
    const chars = document.querySelectorAll('.flame-letter');
    chars.forEach((char, index) => {
      setTimeout(() => {
        char.classList.add('animate-letter-burn');
      }, 150 * index);
    });
  }, []);

  // 3D card effect
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const posX = e.clientX - centerX;
      const posY = e.clientY - centerY;
      
      const rotateX = posY * -0.02;
      const rotateY = posX * 0.02;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      card.style.transition = 'transform 0.5s ease';
    };
    
    const handleMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Generate random floating runes
  const renderRunes = (count: number) => {
    const runeSymbols = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ'];
    return Array.from({
      length: count
    }).map((_, i) => <div key={i} className={cn("absolute text-2xl md:text-3xl text-infernal-blood/20 animate-floating", !showRunes && "opacity-0", showRunes && "opacity-100 transition-opacity duration-1000")} style={{
      left: `${10 + Math.random() * 80}%`,
      top: `${10 + Math.random() * 80}%`,
      animationDuration: `${4 + Math.random() * 6}s`,
      animationDelay: `${Math.random() * 3}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
      transition: "opacity 1s ease-out",
      transitionDelay: `${0.1 + i * 0.1}s`
    }}>
        {runeSymbols[Math.floor(Math.random() * runeSymbols.length)]}
      </div>);
  };

  return (
    <div className="bg-infernal-charcoal text-white min-h-screen overflow-x-hidden">
      {/* Ambient effects */}
      <SmokyOverlay opacity={0.2} />
      <Embers count={40} density="medium" />
      
      <section className="relative min-h-screen py-20 flex items-center justify-center">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-volcanic-terrain opacity-10"></div>
          {/* Runic symbols floating in background */}
          {renderRunes(20)}
          
          {/* Pentagram background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-1/2 h-1/2 opacity-10 animate-spin" style={{animationDuration: '120s'}}>
              <path d="M50 5 L60 40 L95 40 L70 60 L80 95 L50 75 L20 95 L30 60 L5 40 L40 40 Z" fill="none" stroke="#8B0000" strokeWidth="2" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#8B0000" strokeWidth="1" />
            </svg>
          </div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div 
              ref={titleRef} 
              className={cn(
                "font-cinzel text-4xl md:text-6xl mb-8 demonic-shadow relative", 
                isVisible ? "animate-summon" : "opacity-0 translate-y-4"
              )}
            >
              <div className="inline-flex">
                {'NOLYX SOCIETY'.split('').map((letter, index) => (
                  <div key={index} className="relative overflow-hidden px-1">
                    <span 
                      className={`flame-letter inline-block transform transition-all duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
                      style={{ transitionDelay: `${0.1 + index * 0.05}s` }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                    {/* Fire effect under each letter */}
                    <div 
                      className="absolute bottom-0 left-0 w-full h-6 opacity-0 flame-effect"
                      style={{
                        background: 'linear-gradient(to top, rgba(255,69,0,0.7) 0%, rgba(255,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
                        transform: 'translateY(100%)',
                        transition: 'all 0.3s ease'
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
            
            <div 
              ref={cardRef}
              className={cn(
                "relative mb-12 p-6 md:p-10 transition-all duration-300",
                isVisible ? "animate-summon" : "opacity-0 translate-y-4"
              )}
              style={{
                animationDelay: "0.3s",
                transformStyle: 'preserve-3d'
              }}
            >
              {/* 3D card with hover effect */}
              <div className="relative bg-black/50 backdrop-blur-sm border-2 border-infernal-crimson/30 rounded-lg p-8 transition-all duration-300 shadow-[0_0_20px_rgba(139,0,0,0.3)]">
                {/* Decorative top corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-infernal-blood rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-infernal-blood rounded-tr-lg"></div>
                
                {/* Decorative bottom corners */}
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-infernal-blood rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-infernal-blood rounded-br-lg"></div>
                
                <p className="text-xl mb-6 text-gray-200 relative z-10">
                  A secretive community specialized in discussing and creating web3 projects,
                  blockchain applications, and decentralized systems. Enter a realm where digital
                  innovation meets occult aesthetics.
                </p>
                
                <div className="relative inline-block mt-6">
                  <a
                    href="https://nolyx.sytes.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="burning-btn group"
                  >
                    <span className="relative z-10">Cross The Threshold</span>
                  </a>
                  
                  {/* Portal ring effect */}
                  <div className="absolute -inset-4 rounded-full border border-infernal-crimson/20 animate-pulse-glow"></div>
                  <div
                    className="absolute -inset-8 rounded-full border border-infernal-crimson/10 animate-pulse-glow"
                    style={{
                      animationDelay: "0.5s"
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Demonic totems */}
            <div
              className={cn(
                "flex flex-col md:flex-row justify-center items-center gap-8",
                isVisible ? "animate-summon" : "opacity-0 translate-y-4"
              )}
              style={{
                animationDelay: "0.6s"
              }}
            >
              {/* Stone monolith 1 */}
              <div className="w-full md:w-1/3 aspect-[3/4] backdrop-blur-sm bg-black/30 border border-infernal-crimson/30 rounded-lg flex items-center justify-center p-4 transform rotate-1 transition-transform hover:rotate-0 duration-300">
                <div className="charred-border p-4 w-full h-full flex flex-col items-center justify-center">
                  <div className="text-infernal-blood opacity-70 mb-2 text-xl">⛧</div>
                  <p className="font-pirata text-xs md:text-sm opacity-70 rotate-[-3deg]">
                    "The veil between worlds is thin. Step through and witness creation born of chaos."
                  </p>
                </div>
              </div>
              
              {/* Stone monolith 2 */}
              <div className="w-full md:w-1/3 aspect-[3/4] backdrop-blur-sm bg-black/30 border border-infernal-crimson/30 rounded-lg flex items-center justify-center p-4 transform -rotate-2 transition-transform hover:rotate-0 duration-300">
                <div className="charred-border p-4 w-full h-full flex flex-col items-center justify-center">
                  <div className="text-infernal-blood opacity-70 mb-2 text-xl">⛥</div>
                  <p className="font-pirata text-xs md:text-sm opacity-70 rotate-[2deg]">
                    "In darkness we forge. In fire we temper. In code we manifest our will."
                  </p>
                </div>
              </div>
              
              {/* Stone monolith 3 */}
              <div className="w-full md:w-1/3 aspect-[3/4] backdrop-blur-sm bg-black/30 border border-infernal-crimson/30 rounded-lg flex items-center justify-center p-4 transform rotate-1 transition-transform hover:rotate-0 duration-300">
                <div className="charred-border p-4 w-full h-full flex flex-col items-center justify-center">
                  <div className="text-infernal-blood opacity-70 mb-2 text-xl">⸸</div>
                  <p className="font-pirata text-xs md:text-sm opacity-70 rotate-[-1deg]">
                    "The underworld welcomes those who dare to create beyond mortal bounds."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Navigation />
      <Footer />
    </div>
  );
};

export default ElseworldPage;
