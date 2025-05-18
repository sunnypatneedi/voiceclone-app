import React, { useState, useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

/**
 * Props interface for the AudioPlayer component
 */
interface AudioPlayerProps {
  /** URL of the audio file to play */
  audioUrl: string;
}

/**
 * AudioPlayer component for playing and visualizing the generated audio
 * Uses WaveSurfer.js to display waveform visualization
 * 
 * @param props Component properties
 * @returns The AudioPlayer component
 */
const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  audioUrl 
}): JSX.Element => {
  // Component state
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [waveformReady, setWaveformReady] = useState<boolean>(false);
  
  // Refs
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  
  /**
   * Initialize WaveSurfer instance on component mount
   * and clean up on unmount
   */
  useEffect(() => {
    if (waveformRef.current) {
      // Create WaveSurfer instance
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#3b82f6',
        progressColor: '#1d4ed8',
        cursorColor: '#9ca3af',
        barWidth: 2,
        barRadius: 3,
        barGap: 2,
        height: 80,
        responsive: true,
        normalize: true,
      });
      
      // Save to ref
      wavesurferRef.current = wavesurfer;
      
      // Load audio file
      wavesurfer.load(audioUrl);
      
      // Event handlers
      wavesurfer.on('ready', () => {
        setWaveformReady(true);
        setDuration(wavesurfer.getDuration());
      });
      
      wavesurfer.on('play', () => setIsPlaying(true));
      wavesurfer.on('pause', () => setIsPlaying(false));
      wavesurfer.on('finish', () => setIsPlaying(false));
      
      wavesurfer.on('audioprocess', () => {
        setCurrentTime(wavesurfer.getCurrentTime());
      });
      
      // Set initial volume
      wavesurfer.setVolume(volume);
      
      // Cleanup on unmount
      return () => {
        wavesurfer.destroy();
      };
    }
  }, [audioUrl]);
  
  /**
   * Toggle play/pause
   */
  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  };
  
  /**
   * Update volume and apply to wavesurfer
   * @param value New volume value (0-1)
   */
  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(value);
    }
  };
  
  /**
   * Format time in seconds to MM:SS format
   * @param time Time in seconds
   * @returns Formatted time string
   */
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '00:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  /**
   * Handle direct download of the audio file
   */
  const handleDownload = () => {
    // Create a temporary anchor element
    const anchor = document.createElement('a');
    anchor.href = audioUrl;
    anchor.download = 'voice-clone.wav'; // Default filename
    anchor.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cloned Voice</h2>
      <p className="text-gray-600 mb-6">
        Listen to the generated speech or download the audio file.
      </p>
      
      {/* Waveform visualization */}
      <div className="mb-4 bg-gray-50 p-4 rounded-lg">
        <div ref={waveformRef} className="w-full"></div>
        
        {/* Loading indicator */}
        {!waveformReady && (
          <div className="flex justify-center items-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
      
      {/* Player controls */}
      <div className="flex flex-col space-y-4">
        {/* Playback controls */}
        <div className="flex items-center space-x-4">
          {/* Play/pause button */}
          <button
            onClick={togglePlayPause}
            className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center focus:outline-none hover:bg-blue-600 transition"
            disabled={!waveformReady}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m-9-9h18v14H5V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          
          {/* Time display */}
          <div className="text-sm text-gray-600">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          
          {/* Volume control */}
          <div className="flex items-center space-x-2 ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="w-24"
              disabled={!waveformReady}
            />
          </div>
        </div>
        
        {/* Download button */}
        <button
          onClick={handleDownload}
          className="btn btn-secondary"
          disabled={!waveformReady}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Audio
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
