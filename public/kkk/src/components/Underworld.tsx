import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
const Underworld = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showRunes, setShowRunes] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        setTimeout(() => setShowRunes(true), 800);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.2
    });
    const section = document.getElementById('underworld');
    if (section) observer.observe(section);
    return () => {
      if (section) observer.unobserve(section);
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
  return <section id="underworld" className="relative min-h-screen py-20 flex items-center bg-black">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-volcanic-terrain opacity-10"></div>
        {/* Runic symbols floating in background */}
        {renderRunes(20)}
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={cn("font-cinzel text-4xl md:text-5xl mb-8 demonic-shadow", isVisible ? "animate-summon" : "opacity-0 translate-y-4")}>noLyX sOciiETy</h2>
          
          <div className={cn("relative mb-12 infernal-card p-6 md:p-10", isVisible ? "animate-summon" : "opacity-0 translate-y-4")} style={{
          animationDelay: "0.3s"
        }}>
            <p className="text-lg mb-6 text-gray-200">Community that specialized discuss and create web3 project, blockchain and decentralized app.
          </p>
            
            <div className="relative inline-block mt-4">
              <a href="https://nolyx.sytes.net" target="_blank" rel="noopener noreferrer" className="burning-btn group">
                <span className="relative z-10">Join THe Elseworld</span>
              </a>
              
              {/* Portal ring effect */}
              <div className="absolute -inset-4 rounded-full border border-infernal-crimson/20 animate-pulse-glow"></div>
              <div className="absolute -inset-8 rounded-full border border-infernal-crimson/10 animate-pulse-glow" style={{
              animationDelay: "0.5s"
            }}></div>
            </div>
          </div>
          
          {/* Demonic totems */}
          <div className={cn("flex flex-col md:flex-row justify-center items-center gap-8", isVisible ? "animate-summon" : "opacity-0 translate-y-4")} style={{
          animationDelay: "0.6s"
        }}>
            {/* Stone monolith 1 */}
            <div className="w-full md:w-1/3 aspect-[3/4] infernal-card flex items-center justify-center p-4 transform rotate-1">
              <div className="charred-border p-4 w-full h-full flex flex-col items-center justify-center">
                <div className="text-infernal-blood opacity-70 mb-2">⛧</div>
                <p className="font-pirata text-xs md:text-sm opacity-70 rotate-[-3deg]">
                  "The veil between worlds is thin. Step through and witness creation born of chaos."
                </p>
              </div>
            </div>
            
            {/* Stone monolith 2 */}
            <div className="w-full md:w-1/3 aspect-[3/4] infernal-card flex items-center justify-center p-4 transform -rotate-2">
              <div className="charred-border p-4 w-full h-full flex flex-col items-center justify-center">
                <div className="text-infernal-blood opacity-70 mb-2">⛥</div>
                <p className="font-pirata text-xs md:text-sm opacity-70 rotate-[2deg]">
                  "In darkness we forge. In fire we temper. In code we manifest our will."
                </p>
              </div>
            </div>
            
            {/* Stone monolith 3 */}
            <div className="w-full md:w-1/3 aspect-[3/4] infernal-card flex items-center justify-center p-4 transform rotate-1">
              <div className="charred-border p-4 w-full h-full flex flex-col items-center justify-center">
                <div className="text-infernal-blood opacity-70 mb-2">⸸</div>
                <p className="font-pirata text-xs md:text-sm opacity-70 rotate-[-1deg]">
                  "The underworld welcomes those who dare to create beyond mortal bounds."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade for better transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
    </section>;
};
export default Underworld;