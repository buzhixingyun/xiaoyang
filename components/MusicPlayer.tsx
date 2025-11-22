import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { MUSIC_URL } from '../constants';

export interface MusicPlayerHandle {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            console.log("Autoplay prevented, waiting for interaction");
            setIsPlaying(false);
          });
      }
    }
  }));

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_URL} loop />
      <div
        onClick={toggleMusic}
        className={`fixed top-5 right-5 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center z-[1000] cursor-pointer shadow-md text-xl transition-colors duration-300 ${
          isPlaying ? 'text-primary animate-spin-slow' : 'text-gray-400'
        }`}
        style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
      >
        {isPlaying ? '🎵' : '🚫'}
      </div>
    </>
  );
});

export default MusicPlayer;