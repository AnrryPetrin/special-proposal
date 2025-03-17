"use client";

import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';

export default function Confetti() {
  const [windowSize, setWindowSize] = useState({ 
    width: 0, 
    height: 0 
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={200}
      recycle={false}
      colors={['#F43F5E', '#EC4899', '#FB7185', '#FDA4AF', '#FECDD3', '#FFD700']}
    />
  );
}
