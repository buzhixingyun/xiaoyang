import React, { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  duration: number;
  opacity: number;
  size: number;
}

const SnowEffect: React.FC = () => {
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newFlake: Snowflake = {
        id: Date.now(),
        left: Math.random() * 100,
        duration: Math.random() * 3 + 5, // 5s to 8s
        opacity: Math.random() * 0.5 + 0.3,
        size: Math.random() * 10 + 8,
      };

      setFlakes((prev) => [...prev, newFlake]);

      // Cleanup old flakes to prevent memory leaks
      setTimeout(() => {
        setFlakes((prev) => prev.filter((f) => f.id !== newFlake.id));
      }, newFlake.duration * 1000);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1]">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full"
          style={{
            left: `${flake.left}vw`,
            top: '-20px',
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `fall ${flake.duration}s linear infinite`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-10vh); opacity: 1; }
            100% { transform: translateY(105vh); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default SnowEffect;