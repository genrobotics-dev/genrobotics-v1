"use client";

import React, { useState, useEffect } from 'react';

const ResourcesIntro = ({ title, highlight, description, children }) => {
  const [showIndicator, setShowIndicator] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 50 && showIndicator) setShowIndicator(false);

      // Fade-out effect
      const fadeEnd = 400; // distance in px where fade completes
      const newOpacity = Math.max(1 - scrollY / fadeEnd, 0);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showIndicator]);

  return (
    <div
      className="fixed inset-0 w-full h-screen flex flex-col justify-center items-center bg-black overflow-hidden z-10 pointer-events-none"
      style={{ opacity, visibility: opacity < 0.01 ? 'hidden' : 'visible' }}
    >
      <div className="relative z-20 max-w-4xl px-4 text-center">
        <h1 className="font-anton text-4xl md:text-6xl text-white mb-6">
          {title} <span className="text-[#FCD901]">{highlight}</span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>

      {/* Render children (like ScrollIndicator) here */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
        {showIndicator && children}
      </div>

      {/* Optional: Add a subtle glow/gradient effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-yellow-400/5 blur-[80px] md:blur-[120px] pointer-events-none rounded-full"></div>
    </div>
  );
};

export default ResourcesIntro;