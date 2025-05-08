import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [letterIndices, setLetterIndices] = useState<number[]>([]);
  const nameLetters = "Fataa Kasyara".split("");

  // Reveal letters one by one with random flickering
  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      let indices: number[] = [];
      let i = 0;
      const interval = setInterval(() => {
        if (i >= nameLetters.length) {
          clearInterval(interval);
          return;
        }
        indices.push(i);
        setLetterIndices([...indices]);
        i++;
      }, 180); // Time between each letter reveal

      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Generate random embers
  const renderEmbers = (count: number) => {
    return Array.from({
      length: count
    }).map((_, i) => <div key={i} className="ember" style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${3 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 5}s`
    }} />);
  };

  // Added slower flickering animation for the name
  const getFlickerStyle = (index: number) => {
    if (!letterIndices.includes(index)) return {
      opacity: 0
    };
    return {
      opacity: 1,
      animation: `flicker ${8 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 2}s`,
      textShadow: '0 0 8px rgba(255, 69, 0, 0.7)'
    };
  };
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-volcanic-terrain opacity-20"></div>
      
      <div className="absolute inset-0">
        {/* Lava cracks */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-infernal-blood/5 via-transparent to-transparent"></div>
        
        {/* Floating embers */}
        {renderEmbers(20)}
      </div>
      
      {/* Parallax background element */}
      <div className="absolute inset-0 parallax pointer-events-none" style={{
      transform: `translateY(${isLoaded ? '0px' : '20px'})`,
      opacity: isLoaded ? 1 : 0,
      transition: 'transform 1.5s ease-out, opacity 1.5s ease-out',
      transitionDelay: '0.3s'
    }}>
        {/* Runes and sigils background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 border border-infernal-blood/30 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 md:w-48 md:h-48 border border-infernal-lava/20 rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 md:w-32 md:h-32 border border-infernal-blood/20 rounded-full"></div>
          
          {/* Pentagram */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-5">
              <path d="M50 5 L60 40 L95 40 L70 60 L80 95 L50 75 L20 95 L30 60 L5 40 L40 40 Z" fill="none" stroke="#8B0000" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 text-center" style={{
      transform: `translateY(${isLoaded ? '0px' : '40px'})`,
      opacity: isLoaded ? 1 : 0,
      transition: 'transform 1s ease-out, opacity 1s ease-out',
      transitionDelay: '0.8s'
    }}>
        <h1 className="inline-block font-cinzel font-bold text-4xl md:text-6xl lg:text-7xl mb-6">
          {nameLetters.map((letter, index) => <span key={index} className="inline-block transition-all duration-300 hover:scale-110" style={getFlickerStyle(index)}>
              {letter === " " ? "\u00A0" : letter}
            </span>)}
        </h1>
        
        <h2 className="font-cinzel text-xl md:text-3xl mb-8 text-gradient-infernal animate-pulse-glow" style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1.5s ease-out',
        transitionDelay: '2.5s'
      }}>WeB deVELoPment &amp; SECuriTY</h2>
        
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4" style={{
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 1.5s ease-out',
        transitionDelay: '3s'
      }}>
          <Link to="/projects" className="burning-btn group">
            <span className="relative z-10">Explore Project</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-infernal-lava scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          
          <Link to="/elseworld" className="burning-btn group">
            <span className="relative z-10">Join Community</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-infernal-lava scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>
      </div>
      
      {/* Bottom fade for better transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </section>;
};
export default Hero;