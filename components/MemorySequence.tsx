import React, { useState } from 'react';
import DialogBox from './DialogBox';
import { MEMORIES } from '../constants';

interface MemorySequenceProps {
  onComplete: () => void;
}

const MemorySequence: React.FC<MemorySequenceProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < MEMORIES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  // We use a key on DialogBox to force re-animation when index changes
  const currentMemory = MEMORIES[currentIndex];

  return (
    <DialogBox
      key={currentIndex} 
      visible={true}
      title={`${currentMemory.title} ${currentMemory.icon}`}
      buttonText="下一步 >"
      onButtonClick={handleNext}
    >
      {currentMemory.content}
    </DialogBox>
  );
};

export default MemorySequence;