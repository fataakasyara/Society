
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 w-full z-50 transition-all duration-500 py-2 md:py-3",
        isScrolled ? "bg-black border-t border-infernal-crimson/30" : "bg-black/90"
      )}
    >
      <div className="container mx-auto px-2 md:px-4">
        <div className="flex justify-center items-center overflow-x-auto md:overflow-visible scrollbar-none">
          <ul className="flex space-x-1 md:space-x-8 px-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path}
                  className={cn(
                    "nav-link font-cinzel text-xs md:text-base whitespace-nowrap px-2 md:px-4 py-1 md:py-2"
                  )}
                >
                  {isMobile ? link.name.split(' ')[0] : link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Decorative elements that appear on scroll */}
        {isScrolled && (
          <>
            <div className="absolute left-0 bottom-full w-full h-px bg-gradient-to-r from-transparent via-infernal-blood to-transparent"></div>
            <div className="hidden md:block absolute left-4 bottom-2 w-8 h-8 opacity-30">
              <div className="ember" style={{ animationDelay: '0s' }}></div>
              <div className="ember" style={{ animationDelay: '1s', left: '10px' }}></div>
              <div className="ember" style={{ animationDelay: '2s', left: '20px' }}></div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
