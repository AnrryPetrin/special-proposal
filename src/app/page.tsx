"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Confetti from "@/components/Confetti";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [answered, setAnswered] = useState(false);
  const [showNoButton, setShowNoButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const yesButtonRef = useRef<HTMLButtonElement>(null);

  // Initialize button position after component mounts and on resize
  useEffect(() => {
    const positionNoButton = () => {
      requestAnimationFrame(() => {
        if (yesButtonRef.current) {
          const yesRect = yesButtonRef.current.getBoundingClientRect();
          
          // For mobile, position below rather than to the right
          const isMobile = window.innerWidth < 640;
          
          setNoButtonPosition({
            top: isMobile ? yesRect.bottom + 16 : yesRect.top,
            left: isMobile ? yesRect.left : yesRect.right + 20
          });
          
          setShowNoButton(true);
        }
      });
    };

    positionNoButton();
    
    // Reposition on resize
    window.addEventListener('resize', positionNoButton);
    return () => window.removeEventListener('resize', positionNoButton);
  }, []);

  const handleYesClick = () => {
    setShowConfetti(true);
    setAnswered(true);
  };

  const calculateSafePosition = () => {
    if (!containerRef.current || !noButtonRef.current) return null;
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const buttonWidth = noButtonRef.current.offsetWidth || 100;
    const buttonHeight = noButtonRef.current.offsetHeight || 50;
    
    // Adjust padding based on screen size
    const padding = viewportWidth < 640 ? 10 : 20;
    const maxLeft = viewportWidth - buttonWidth - padding;
    const maxTop = viewportHeight - buttonHeight - padding;
    
    // Keep button in visible area with more constraint on mobile
    return {
      top: Math.min(Math.max(padding, Math.random() * maxTop), maxTop),
      left: Math.min(Math.max(padding, Math.random() * maxLeft), maxLeft)
    };
  };

  const moveNoButton = () => {
    const newPosition = calculateSafePosition();
    if (newPosition) {
      setNoButtonPosition(newPosition);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200 dark:from-rose-900 dark:to-pink-900 p-4 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      <div 
        ref={containerRef} 
        className="w-full max-w-sm sm:max-w-md bg-white/90 dark:bg-gray-800/90 p-5 sm:p-8 rounded-xl shadow-xl backdrop-blur-sm relative"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-rose-600 dark:text-rose-400 mb-4 sm:mb-6">
          I have a special question for you!❤️
        </h1>
        
        <div className="mb-6 sm:mb-8">
          <div className="relative w-full aspect-square mb-3 sm:mb-4 rounded-lg overflow-hidden">
            <Image
              src="/image.png"
              alt="Us together"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-sm text-gray-500 italic mb-3 sm:mb-4">Us together</p>
        </div>
        
        <p className="text-lg sm:text-xl mb-6 sm:mb-8 font-medium text-gray-800 dark:text-gray-200">
          In the midst of a past filled with pain, you've helped me rediscover hope and trust. My heart now beats with gentle joy, and I long to share this newfound love with you.<br/>Will you be my girlfriend?
        </p>
        
        {!answered ? (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 min-h-[100px] sm:min-h-[150px] relative">
            <button
              ref={yesButtonRef}
              onClick={handleYesClick}
              className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-rose-400 z-20"
            >
              Yes! 💜
            </button>
          </div>
        ) : (
          <div className="text-xl sm:text-2xl font-bold text-rose-600 animate-bounce">
            You just made me the happiest person! 💖
          </div>
        )}
      </div>
      
      {!answered && showNoButton && (
        <button
          ref={noButtonRef}
          onMouseEnter={moveNoButton}
          onTouchStart={moveNoButton}
          onClick={moveNoButton}
          className="bg-gray-300 hover:bg-gray-400 active:bg-gray-500 text-gray-800 px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all absolute"
          style={{
            top: `${noButtonPosition.top}px`,
            left: `${noButtonPosition.left}px`,
            zIndex: 50,
            touchAction: "none", // Prevents scrolling when touching the button
          }}
        >
          No
        </button>
      )}
      
      <p className="mt-6 sm:mt-8 text-sm text-gray-600 dark:text-gray-300">
        Made with ❤️ just for you
      </p>
    </div>
  );
}
