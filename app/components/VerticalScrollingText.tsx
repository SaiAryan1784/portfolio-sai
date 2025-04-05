"use client"
import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface VerticalScrollTextProps {
  text: string;
  direction?: 'up' | 'down';
  fontSize?: string;
  color?: string;
  speed?: number;
  containerHeight: string;
}

const VerticalScrollingText: React.FC<VerticalScrollTextProps> = ({
  text,
  direction = 'up',
  fontSize = '10rem',
  color = '#0000003d',
  speed = 1,
  containerHeight,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const repeatedText = useMemo(() => {
    // Adjust the number (e.g., 15) if needed based on font size and expected heights
    return Array(2).fill(text).join(' ');
}, [text]);

  const moveDistance = 50 * speed; // Base distance (50%) multiplied by speed
  
  // Calculate the transformation based on direction and speed
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' 
      ? ['0%', `-${moveDistance}%`] 
      : [`-${moveDistance}%`, '0%']
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden w-[14rem]" style={{ height: containerHeight }}>
      <motion.div
        className="absolute whitespace-nowrap"
        style={{
          y,
          fontSize,
          color,
          fontWeight: 'bold',
          willChange: 'transform',
          transformOrigin: 'center top',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          top: direction === 'up' ? '0' : undefined,
          bottom: direction === 'down' ? '0' : undefined,
          // Center the text block horizontally
          left: '50%',
          translateX: '-50%',
        }}
      >
        {repeatedText}
      </motion.div>
    </div>
  );
};

export default VerticalScrollingText;