
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Embers from '@/components/Embers';
import SmokyOverlay from '@/components/SmokyOverlay';
import { Flame, BookOpen, Calendar } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Art of Digital Alchemy",
    excerpt: "Transforming raw code into digital experiences that captivate and engage users.",
    date: "May 12, 2023",
    category: "Design"
  },
  {
    id: 2,
    title: "Securing the Gates of Hell",
    excerpt: "Advanced techniques for protecting web applications from modern attack vectors.",
    date: "April 3, 2023",
    category: "Security"
  },
  {
    id: 3,
    title: "Flames of Innovation",
    excerpt: "How to keep the creative fire burning in long-term development projects.",
    date: "March 18, 2023",
    category: "Creativity"
  },
  {
    id: 4,
    title: "Whispers from the Code",
    excerpt: "Understanding the subtle patterns that emerge in complex systems.",
    date: "February 22, 2023",
    category: "Development"
  }
];

const BlogPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activePost, setActivePost] = useState<number | null>(null);
  const [animatedLetters, setAnimatedLetters] = useState<string[]>([]);
  
  useEffect(() => {
    setIsVisible(true);
    
    // Animate title letters
    const titleText = "Chronicles";
    const letters = titleText.split('');
    
    const animateLetters = async () => {
      for (let i = 0; i <= letters.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 150));
        setAnimatedLetters(letters.slice(0, i));
      }
    };
    
    animateLetters();
  }, []);
  
  const togglePost = (id: number) => {
    setActivePost(activePost === id ? null : id);
  };

  return (
    <div className="bg-infernal-charcoal text-white min-h-screen overflow-x-hidden">
      {/* Background effects */}
      <SmokyOverlay opacity={0.2} />
      <Embers count={30} density="low" />
      
      {/* Gold accent styling */}
      <style>
        {`
          .gold-text {
            color: #FFD700;
          }
          .gold-border {
            border-color: #DAA520;
          }
          .gold-bg {
            background-color: #B8860B;
          }
          .gold-shadow {
            text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
          }
          .gold-glow {
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
          }
          .gold-gradient {
            background: linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #DAA520 100%);
          }
        `}
      </style>
      
      <div className="container mx-auto px-4 py-20">
        <header className={cn("max-w-4xl mx-auto text-center mb-16", isVisible ? "animate-summon" : "opacity-0")}>
          <h1 className="font-cinzel text-5xl md:text-7xl mb-6 gold-shadow">
            {animatedLetters.map((letter, index) => (
              <span 
                key={index} 
                className="relative inline-block gold-text"
                style={{ 
                  animation: `fadeInGold 0.5s ease forwards`,
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0,
                  transform: 'translateY(20px)'
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-xl italic font-pirata mt-4 text-amber-200">
            "Words inscribed in eternal gold, wisdom preserved through ages."
          </p>
          
          <style>
            {`
              @keyframes fadeInGold {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                  text-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                  text-shadow: 0 0 20px rgba(255, 215, 0, 0.8), 0 0 30px rgba(218, 165, 32, 0.6);
                }
              }
            `}
          </style>
        </header>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              className={cn(
                "relative",
                isVisible ? "animate-summon" : "opacity-0 translate-y-4"
              )}
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              <div 
                className={cn(
                  "relative overflow-hidden rounded-lg border-2 bg-black/40 transition-all duration-500 cursor-pointer gold-border",
                  activePost === post.id ? "gold-glow" : ""
                )}
                onClick={() => togglePost(post.id)}
              >
                {/* Ambient effects */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/10 to-transparent"></div>
                  <div className="absolute top-0 left-0 right-0 h-px gold-gradient opacity-50"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px gold-gradient opacity-50"></div>
                </div>
                
                <div className="relative z-10 p-6">
                  <div className="flex items-center mb-4 space-x-3">
                    <div className="p-2 rounded-full bg-amber-900/60">
                      <BookOpen className="w-5 h-5 text-amber-300" />
                    </div>
                    <span className="text-sm uppercase tracking-wider text-amber-300">{post.category}</span>
                  </div>
                  
                  <h2 className="font-cinzel text-2xl mb-3 text-amber-100">{post.title}</h2>
                  <p className="text-amber-100/80 mb-6">{post.excerpt}</p>
                  
                  <div className="flex items-center text-sm text-amber-300/70">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{post.date}</span>
                  </div>
                  
                  {/* Expanded content */}
                  <div className={cn(
                    "mt-6 overflow-hidden transition-all duration-500",
                    activePost === post.id ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                  )}>
                    <div className="pt-4 border-t border-amber-900/50">
                      <p className="text-amber-100/70 mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum, 
                        nulla sit amet fermentum efficitur, quam nisl congue nulla, vel auctor
                        magna dolor quis tortor.
                      </p>
                      <div className="text-center">
                        <button className="px-6 py-2 rounded-full bg-amber-900/80 text-amber-200 hover:bg-amber-800 transition-colors duration-300 font-cinzel">
                          Read More
                        </button>
                      </div>
                    </div>
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

export default BlogPage;
