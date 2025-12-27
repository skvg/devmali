'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Button';
import { Card } from './Card';

interface SpiritualAmbiancePlayerProps {
  isPlaying: boolean;
  onToggle: (playing: boolean) => void;
}

interface AmbianceTrack {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: string;
  type: 'temple' | 'nature' | 'chanting' | 'instrumental';
}

const SpiritualAmbiancePlayer: React.FC<SpiritualAmbiancePlayerProps> = ({ 
  isPlaying, 
  onToggle 
}) => {
  const [selectedTrack, setSelectedTrack] = useState<AmbianceTrack | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sample ambiance tracks - in a real app, these would come from a CMS
  const ambianceTracks: AmbianceTrack[] = [
    {
      id: 'temple-bells',
      title: 'Temple Bells & Chanting',
      description: 'Traditional temple atmosphere with gentle bell sounds and distant chanting',
      audioUrl: '/audio/ambiance/temple-bells.mp3',
      duration: '15:30',
      type: 'temple'
    },
    {
      id: 'om-chanting',
      title: 'Om Meditation',
      description: 'Peaceful Om chanting for deep meditation and spiritual connection',
      audioUrl: '/audio/ambiance/om-chanting.mp3',
      duration: '20:00',
      type: 'chanting'
    },
    {
      id: 'flute-meditation',
      title: 'Divine Flute',
      description: 'Soothing flute melodies inspired by Lord Krishna\'s divine music',
      audioUrl: '/audio/ambiance/divine-flute.mp3',
      duration: '18:45',
      type: 'instrumental'
    },
    {
      id: 'nature-sounds',
      title: 'Aravalli Serenity',
      description: 'Natural sounds from the Aravalli hills surrounding Devmali village',
      audioUrl: '/audio/ambiance/aravalli-nature.mp3',
      duration: '25:00',
      type: 'nature'
    }
  ];

  useEffect(() => {
    // Set default track
    if (!selectedTrack && ambianceTracks.length > 0) {
      setSelectedTrack(ambianceTracks[0]);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !selectedTrack) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      // Loop the track
      audio.currentTime = 0;
      if (isPlaying) {
        audio.play();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [selectedTrack, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  }, [isPlaying, selectedTrack]);

  const handleTrackSelect = (track: AmbianceTrack) => {
    setSelectedTrack(track);
    setCurrentTime(0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getTrackTypeIcon = (type: AmbianceTrack['type']) => {
    switch (type) {
      case 'temple': return '🛕';
      case 'nature': return '🌿';
      case 'chanting': return '🕉️';
      case 'instrumental': return '🎵';
      default: return '🎶';
    }
  };

  const getTrackTypeColor = (type: AmbianceTrack['type']) => {
    switch (type) {
      case 'temple': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'nature': return 'bg-green-100 text-green-800 border-green-200';
      case 'chanting': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'instrumental': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-orange-700 mb-2">
            🎵 Spiritual Ambiance
          </h3>
          <p className="text-sm text-gray-600">
            Enhance your virtual darshan experience with sacred sounds and peaceful ambiance
          </p>
        </div>

        {/* Track Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {ambianceTracks.map((track) => (
            <button
              key={track.id}
              onClick={() => handleTrackSelect(track)}
              className={`
                p-3 rounded-lg border-2 transition-all duration-200 text-left
                ${selectedTrack?.id === track.id 
                  ? 'border-orange-300 bg-orange-100' 
                  : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50'
                }
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getTrackTypeIcon(track.type)}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getTrackTypeColor(track.type)}`}>
                  {track.type}
                </span>
              </div>
              <h4 className="font-medium text-gray-800 text-sm mb-1">
                {track.title}
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                {track.description}
              </p>
              <p className="text-xs text-gray-500">
                Duration: {track.duration}
              </p>
            </button>
          ))}
        </div>

        {/* Audio Player Controls */}
        {selectedTrack && (
          <div className="bg-white rounded-lg p-4 space-y-4">
            <audio
              ref={audioRef}
              src={selectedTrack.audioUrl}
              preload="metadata"
              loop
            />

            {/* Now Playing */}
            <div className="text-center">
              <p className="text-sm font-medium text-gray-800">
                Now Playing: {selectedTrack.title}
              </p>
              <p className="text-xs text-gray-600">
                {selectedTrack.description}
              </p>
            </div>

            {/* Main Controls */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant={isPlaying ? 'secondary' : 'primary'}
                onClick={() => onToggle(!isPlaying)}
                className="flex items-center gap-2 px-6 py-2"
              >
                {isPlaying ? '⏸️ Pause' : '▶️ Play'}
              </Button>
            </div>

            {/* Progress and Volume */}
            <div className="space-y-3">
              {/* Time Display */}
              <div className="flex justify-between text-xs text-gray-600">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-xs text-gray-600 min-w-[30px]">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>

            {/* Usage Tips */}
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs text-orange-700">
                💡 <strong>Tip:</strong> Keep the ambiance playing softly in the background while viewing the darshan images for a more immersive spiritual experience.
              </p>
            </div>
          </div>
        )}
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
    </Card>
  );
};

export default SpiritualAmbiancePlayer;