
import React from 'react';
import Hero from '@/components/Hero';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Embers from '@/components/Embers';
import SmokyOverlay from '@/components/SmokyOverlay';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const Index = () => {
  return (
    <div className="bg-infernal-charcoal text-white min-h-screen overflow-x-hidden">
      {/* Ambient effects */}
      <SmokyOverlay opacity={0.15} />
      <Embers count={30} density="low" />
      
      {/* Page content */}
      <Hero />
      
      {/* Read Blog Button */}
      <div className="flex justify-center my-8">
        <Link to="/blog">
          <Button className="burning-btn group flex items-center gap-2">
            <span>Read Blog</span>
            <BookOpen className="w-5 h-5" />
          </Button>
        </Link>
      </div>
      
      {/* Navigation fixed at bottom with solid background */}
      <Navigation />
      <Footer />
    </div>
  );
};

export default Index;
