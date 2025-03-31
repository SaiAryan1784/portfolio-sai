"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const Goku = () => {
  const [beamWidth, setBeamWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the total scrollable distance
      const totalScrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      // Get scroll progress (from 0 to 1)
      const progress = Math.min(window.scrollY / totalScrollable, 1);
      // Maximum beam width: full viewport width minus Goku's offset (80px)
      const maxWidth = window.innerWidth - 80;
      setBeamWidth(progress * maxWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);
    // Call it on mount to initialize
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 p-2 z-50">
      {/* Goku Image */}
      <Image
        src="/goku.png"
        alt="Goku"
        width={80}
        height={80}
        className="animate-float transition-transform duration-300 ease-in-out"
      />

      {/* Kamehameha Beam */}
      <div
        style={{ width: `${beamWidth}px` }}
        className={`
          absolute
          top-[50%]
          left-[80px]
          -translate-y-1/2
          h-6
          transition-all
          duration-300
          ease-in-out
          beam animate-pulse-energy
        `}
      ></div>
    </div>
  );
};

export default Goku;
