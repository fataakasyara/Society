
import React, { useState, useEffect } from 'react';

interface EmbersProps {
  count: number;
  density?: 'low' | 'medium' | 'high';
}

const Embers: React.FC<EmbersProps> = ({ count, density = 'low' }) => {
  const [embers, setEmbers] = useState<{id: number; x: number; y: number; size: number; delay: number; duration: number}[]>([]);
  
  useEffect(() => {
    // Create random embers
    const newEmbers = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // % position
      y: Math.random() * 100, // % position
      size: 1 + Math.random() * 2, // Size between 1-3px
      delay: Math.random() * 5, // Random delay up to 5s
      duration: 3 + Math.random() * 4, // Animation duration 3-7s
    }));
    
    setEmbers(newEmbers);
  }, [count]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-20" style={{ opacity: density === 'low' ? 0.4 : density === 'medium' ? 0.6 : 0.8 }}>
      {embers.map(ember => (
        <div 
          key={ember.id}
          className="ember"
          style={{
            left: `${ember.x}%`,
            bottom: '10%',
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            animationDelay: `${ember.delay}s`,
            animationDuration: `${ember.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Embers;
