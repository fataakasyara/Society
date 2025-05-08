
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-infernal-charcoal text-white">
      <div className="text-center">
        <h1 className="text-8xl font-cinzel text-infernal-blood mb-4 demonic-shadow animate-pulse-glow">404</h1>
        <p className="text-xl font-pirata mb-8">Your soul has wandered into the void</p>
        <a href="/" className="burning-btn">
          <span className="relative z-10">Return to the Infernal Realm</span>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
