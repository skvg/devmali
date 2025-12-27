'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';

interface AudioPlayerProps {
  src: string;
  title: string;
  compact?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, title, compact = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = parseFloat(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-orange-50 rounded-lg p-2">
        <audio ref={audioRef} src={src} preload="metadata" />
        <Button
          variant="secondary"
          size="sm"
          onClick={togglePlayPause}
          className="flex items-center gap-1 text-xs"
        >
          {isPlaying ? '⏸️' : '▶️'}
          <span className="hidden sm:inline">
            {isPlaying ? 'Pause' : 'Play'}
          </span>
        </Button>
        <span className="text-xs text-gray-600 truncate flex-1">
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-4 space-y-3">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      {/* Title */}
      <div className="text-sm font-medium text-orange-800 truncate">
        🎵 {title}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={togglePlayPause}
          className="flex items-center gap-2 min-w-[80px]"
        >
          {isPlaying ? '⏸️' : '▶️'}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        {/* Progress Bar */}
        <div className="flex-1 space-y-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 min-w-[100px]">
          <span className="text-sm">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default AudioPlayer;