import React, { useState, useEffect, useCallback } from 'react';
import { HEART_MESSAGES } from '../constants';

interface HeartGameProps {
  onComplete: () => void;
}

const TOTAL_BOXES = 24;

const HeartGame: React.FC<HeartGameProps> = ({ onComplete }) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const getHeartPosition = (index: number, total: number) => {
    const t = (index / total) * 2 * Math.PI;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    const scale = 20; 
    return { x: x * scale, y: y * scale };
  };

  const handleInteraction = useCallback(() => {
    if (revealedCount < TOTAL_BOXES) {
      setRevealedCount(prev => prev + 1);
    }
  }, [revealedCount]);

  useEffect(() => {
    if (revealedCount === TOTAL_BOXES) {
      // Small delay to show "Collection Complete" before moving on
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(onComplete, 600);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [revealedCount, onComplete]);

  // Helper to determine box styles based on index
  const getBoxStyle = (index: number) => {
    const baseStyle = "absolute w-[70px] h-[70px] rounded-[15px] flex items-center justify-center text-center p-0.5 text-lg font-bold font-mashan shadow-lg transition-all duration-300 ease-out";
    const pos = getHeartPosition(index, TOTAL_BOXES);
    
    // Color logic matching original CSS :nth-child(4n+1) etc
    let colors = "";
    const mod = (index + 1) % 4;
    if (mod === 1) colors = "bg-[#FFD1DC] text-white";
    else if (mod === 2) colors = "bg-[#E2F0CB] text-[#779966]";
    else if (mod === 3) colors = "bg-[#FFF5BA] text-[#D4A373]";
    else colors = "bg-white text-primary border-2 border-primary";

    // Transform logic
    const isRevealed = index < revealedCount;
    // Center logic: window center assumed roughly, using translate to center relative to container
    const transform = isRevealed 
      ? `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(1)`
      : `translate(-50%, -50%) scale(0)`;

    const opacity = isClosing ? 0 : (isRevealed ? 1 : 0);

    return {
      className: `${baseStyle} ${colors}`,
      style: {
        left: '50%',
        top: '50%',
        transform: isClosing ? `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(0) translateY(-30px)` : transform,
        opacity: opacity,
        zIndex: 200
      }
    };
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full z-[200] cursor-pointer select-none" 
      onClick={handleInteraction}
    >
      {/* Boxes Container */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {Array.from({ length: TOTAL_BOXES }).map((_, i) => {
          const { className, style } = getBoxStyle(i);
          return (
            <div key={i} className={className} style={style}>
              {HEART_MESSAGES[i % HEART_MESSAGES.length]}
            </div>
          );
        })}
      </div>

      {/* Hint Text */}
      <div 
        className={`fixed bottom-[30px] w-full text-center font-mashan text-2xl text-primary z-[300] pointer-events-none transition-opacity duration-500 ${revealedCount === TOTAL_BOXES ? 'opacity-0' : 'animate-pulse-slow opacity-100'}`}
      >
        {revealedCount === TOTAL_BOXES 
          ? "🎉 收集完成！" 
          : `👆 点击屏幕收集祝福 (${revealedCount}/${TOTAL_BOXES})`}
      </div>
    </div>
  );
};

export default HeartGame;