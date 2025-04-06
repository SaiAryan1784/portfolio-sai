"use client"
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollTextProps {
  text: string;
  direction?: 'left' | 'right';
  fontSize?: string;
  color?: string;
  speed?: number;
}

const ScrollingText: React.FC<ScrollTextProps> = ({
  text,
  direction = 'left',
  fontSize = '10rem',
  color = '#00000020',
  speed = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Create a modified scrollYProgress that's affected by speed
  const scrollFactor = useTransform(
    scrollYProgress,
    [0, 1/speed], // Compress input range based on speed
    [0, 1],
    { clamp: false } // Important: allows values outside 0-1 range
  );

  // Ensure full text visibility by duplicating the text
  const repeatedText = Array(3).fill(text).join(' ');

  // Calculate the transformation based on direction
  const x = useTransform(
    scrollFactor, // Use our speed-modified scroll progress
    [0, 1],
    direction === 'left' ? ['0%', '-33%'] : ['-33%', '0%']
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-[14rem] text-center">
      <motion.div
        className="absolute whitespace-nowrap"
        style={{
          x,
          fontSize,
          color,
          fontWeight: 'bold',
          willChange: 'transform',
          transformOrigin: 'left center',
        }}
      >
        {repeatedText}
      </motion.div>
    </div>
  );
};

export default ScrollingText;