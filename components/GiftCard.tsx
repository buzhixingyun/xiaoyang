import React, { useEffect, useState } from 'react';

interface GiftCardProps {
  onOpen: () => void;
}

const GiftCard: React.FC<GiftCardProps> = ({ onOpen }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Slight delay to allow previous stage to fade out
    setTimeout(() => setVisible(true), 100);
  }, []);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVisible(false);
    setTimeout(onOpen, 800); // Match transition duration
  };

  return (
    <div className={`fixed inset-0 w-full h-full bg-bg/80 backdrop-blur-md z-[100] flex items-center justify-center transition-all duration-1000 ease-in-out ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className={`bg-white w-[90%] max-w-[450px] p-10 rounded-[30px] border-4 border-dashed border-primary shadow-[0_20px_50px_rgba(212,163,115,0.3)] text-center relative transition-all duration-800 delay-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[50px] opacity-0'}`}>
        
        {/* Ribbon */}
        <div className="absolute -top-[10px] -right-[10px] w-20 h-20 bg-secondary rounded-full opacity-50 -z-10" />

        <h2 className="font-fredoka text-text text-3xl mb-4">To: 亲爱的你 ✨</h2>
        <p className="font-mashan text-xl leading-relaxed text-[#8d6e63] mb-6">
          集齐啦！<br/>每一个方块都是我的心意。<br/>圣诞快乐！
        </p>

        <div className="flex justify-center gap-4 mb-8 h-[120px]">
          <div className="bg-white p-2 pb-6 shadow-md rotate-[-5deg] w-[100px] border border-gray-100">
            <div className="w-full h-[70px] bg-[#FFD1DC] flex items-center justify-center text-2xl">🍬</div>
          </div>
          <div className="bg-white p-2 pb-6 shadow-md rotate-[5deg] translate-y-[10px] w-[100px] border border-gray-100">
            <div className="w-full h-[70px] bg-[#FFD1DC] flex items-center justify-center text-2xl">🌟</div>
          </div>
        </div>

        <button 
          onClick={handleOpen}
          className="bg-primary text-white font-fredoka text-lg px-8 py-3 rounded-full shadow-[0_4px_0_#d86c7f] active:translate-y-[4px] active:shadow-none transition-transform hover:brightness-110"
        >
          拆开礼物 🎁
        </button>
      </div>
    </div>
  );
};

export default GiftCard;