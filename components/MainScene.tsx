import React, { useEffect, useState } from 'react';

const MainScene: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Trigger fade in
    requestAnimationFrame(() => setActive(true));
  }, []);

  return (
    <>
      <div className={`relative z-10 flex flex-col items-center justify-center h-full text-center transition-all duration-800 ease-in-out ${active ? 'blur-0 opacity-100' : 'blur-sm opacity-50'}`}>
        <h1 className="font-fredoka text-5xl md:text-7xl text-primary mb-5 drop-shadow-sm">
          Merry Christmas!
        </h1>
        <div className="text-[5rem] md:text-[7rem] cursor-pointer animate-float select-none">
          🦌
        </div>
        <p className="mt-5 text-text font-bold text-xl md:text-2xl font-mashan">
          属于你的可爱冬天
        </p>
      </div>

      {/* Snow Ground */}
      <div className="fixed -bottom-[50px] left-0 w-full h-[150px] bg-white rounded-[50%_50%_0_0/100%_100%_0_0] scale-x-150 z-[2]" />
    </>
  );
};

export default MainScene;