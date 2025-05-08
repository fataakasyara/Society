
import React from 'react';

interface SmokyOverlayProps {
  opacity?: number;
}

const SmokyOverlay: React.FC<SmokyOverlayProps> = ({ opacity = 0.2 }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {/* Smoky overlay with filtered noise */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ 
          opacity: opacity,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      ></div>
    </div>
  );
};

export default SmokyOverlay;
