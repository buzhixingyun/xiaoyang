import React from 'react';

interface DialogBoxProps {
  title?: string;
  children: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  visible: boolean;
  className?: string;
}

const DialogBox: React.FC<DialogBoxProps> = ({
  title,
  children,
  buttonText,
  onButtonClick,
  visible,
  className = ""
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black/30 backdrop-blur-[3px] z-50 flex items-center justify-center transition-opacity duration-500 animate-pop-in p-4">
      <div className={`bg-paper w-[90%] max-w-[500px] p-8 rounded-[20px] border-[3px] border-text shadow-[10px_10px_0px_rgba(212,163,115,0.5)] relative max-h-[80vh] overflow-y-auto scrollbar-hide ${className}`}>
        <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[15px] h-[15px] bg-primary rounded-full shadow-[inset_2px_2px_5px_rgba(255,255,255,0.5)]" />
        
        {title && (
          <h3 className="text-text text-2xl font-fredoka mb-4 mt-2">
            {title}
          </h3>
        )}

        <div className="mt-4 font-mashan text-xl leading-relaxed text-[#5d4037] text-left whitespace-pre-wrap">
          {children}
        </div>

        {buttonText && onButtonClick && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick();
            }}
            className="bg-primary text-white font-fredoka text-lg px-8 py-2 rounded-full mt-6 float-right shadow-[0_4px_0_#d86c7f] active:translate-y-[4px] active:shadow-none transition-transform"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DialogBox;