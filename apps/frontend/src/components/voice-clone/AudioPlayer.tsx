import React, { useState, useEffect, useRef, useCallback } from 'react';
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
 */
const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }): JSX.Element => {
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
   * Format time in seconds to MM:SS format
   */
  const formatTime = useCallback((timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, []);

  /**
   * Toggle play/pause of the audio
   */
  const togglePlayPause = useCallback((): void => {
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
    }
  }, []);

  /**
   * Handle volume change
   */
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | number): void => {
    const newVolume = typeof e === 'number' ? e : parseFloat((e as React.ChangeEvent<HTMLInputElement>).target.value);
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
    }
  }, []);

  /**
   * Handle download of the audio file
   */
  const handleDownload = useCallback((): void => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'voice-clone-audio.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [audioUrl]);

  /**
   * Initialize WaveSurfer instance on component mount
   * and clean up on unmount
   */
  useEffect(() => {
    if (!waveformRef.current) {
      return;
    }

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
      normalize: true,
    });

    // Save to ref
    wavesurferRef.current = wavesurfer;

    // Load audio file
    wavesurfer.load(audioUrl);

    // Event handlers
    const updateTime = () => {
      setCurrentTime(wavesurfer.getCurrentTime());
    };

    const readyHandler = () => {
      setWaveformReady(true);
      setDuration(wavesurfer.getDuration());
    };

    const playHandler = () => setIsPlaying(true);
    const pauseHandler = () => setIsPlaying(false);
    const finishHandler = () => setIsPlaying(false);
    const audioProcessHandler = updateTime;

    // Add event listeners
    wavesurfer.on('ready', readyHandler);
    wavesurfer.on('play', playHandler);
    wavesurfer.on('pause', pauseHandler);
    wavesurfer.on('finish', finishHandler);
    wavesurfer.on('audioprocess', audioProcessHandler);
    
    // Set initial volume
    wavesurfer.setVolume(volume);

    // Clean up on unmount
    return () => {
      // No need to explicitly remove listeners as destroy() will clean them up
      wavesurfer.destroy();
    };
  }, [audioUrl, volume]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-2xl">
      {/* Waveform visualization */}
      <div ref={waveformRef} className="mb-4" />

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>

        <div className="flex-1 mx-4">
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
              onChange={(e) => handleVolumeChange(e)}
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
