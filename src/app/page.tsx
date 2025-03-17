"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Confetti from "@/components/Confetti";

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [answered, setAnswered] = useState(false);

  const handleYesClick = () => {
    setShowConfetti(true);
    setAnswered(true);
  };

  const moveNoButton = () => {
    const maxWidth = window.innerWidth - 100;
    const maxHeight = window.innerHeight - 60;
    
    setNoButtonPosition({
      top: Math.random() * maxHeight,
      left: Math.random() * maxWidth
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 to-pink-200 dark:from-rose-900 dark:to-pink-900 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {showConfetti && <Confetti />}
      
      <div className="max-w-md w-full bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-xl backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-rose-600 dark:text-rose-400 mb-6">
          Happy Birthday! 🎂
        </h1>
        
        <div className="mb-8">
          <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden">
            <Image
              src="/placeholder-image.jpg"
              alt="Us together"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-sm text-gray-500 italic mb-4">Replace with your favorite photo together</p>
        </div>
        
        <p className="text-xl mb-8 font-medium text-gray-800 dark:text-gray-200">
          You make my heart smile every day.<br/>Will you be my girlfriend?
        </p>
        
        {!answered ? (
          <div className="flex justify-center gap-6 relative">
            <button
              onClick={handleYesClick}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-medium transition-all hover:scale-110"
            >
              Yes! 💕
            </button>
            
            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-full text-lg font-medium transition-all absolute"
              style={{
                top: noButtonPosition.top,
                left: noButtonPosition.left,
                transform: noButtonPosition.top ? "none" : "none",
              }}
            >
              No
            </button>
          </div>
        ) : (
          <div className="text-2xl font-bold text-rose-600 animate-bounce">
            Yay! You just made me the happiest person! 💖
          </div>
        )}
      </div>
      
      <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
        Made with ❤️ just for you
      </p>
    </div>
  );
}
