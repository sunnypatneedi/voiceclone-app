import React from 'react';
import { VoiceSampleStatus } from 'shared-types';

/**
 * Props interface for the ProcessingStatus component
 */
interface ProcessingStatusProps {
  /** Current status of the voice sample or "synthesis" for synthesis process */
  status: VoiceSampleStatus | 'synthesis';
}

/**
 * ProcessingStatus component that displays the current processing status
 * Shows loading indicators and descriptive messages about the current process
 * 
 * @param props Component properties
 * @returns The ProcessingStatus component
 */
const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ 
  status 
}): JSX.Element => {
  /**
   * Get the appropriate status message based on the current status
   * @returns Status message and description
   */
  const getStatusContent = () => {
    switch (status) {
      case VoiceSampleStatus.PENDING:
        return {
          title: 'Preparing Sample',
          description: 'Your voice sample is being prepared for processing.',
          progress: 25
        };
      case VoiceSampleStatus.PROCESSING:
        return {
          title: 'Analyzing Voice',
          description: 'Analyzing your voice characteristics using Cartesia.',
          progress: 50
        };
      case 'synthesis':
        return {
          title: 'Generating Speech',
          description: 'Converting your text to speech using PipeCat.',
          progress: 75
        };
      default:
        return {
          title: 'Processing',
          description: 'Your request is being processed.',
          progress: 50
        };
    }
  };

  const { title, description, progress } = getStatusContent();

  return (
    <div className="p-6 flex flex-col items-center text-center">
      {/* Spinner animation */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"
          style={{ animationDuration: '1.5s' }}
        ></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">{progress}%</span>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-sm text-gray-500">This may take a few moments...</p>
      
      {/* Processing steps */}
      <div className="w-full max-w-md mt-8">
        <div className="relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200"></div>
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
          
          {/* Step indicators */}
          <div className="relative flex justify-between">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full ${progress >= 25 ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center z-10`}>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xs mt-1">Upload</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full ${progress >= 50 ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center z-10`}>
                {progress >= 50 ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-white text-xs">2</span>
                )}
              </div>
              <span className="text-xs mt-1">Analyze</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full ${progress >= 75 ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center z-10`}>
                {progress >= 75 ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-white text-xs">3</span>
                )}
              </div>
              <span className="text-xs mt-1">Synthesize</span>
            </div>
            
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full ${progress >= 100 ? 'bg-blue-500' : 'bg-gray-300'} flex items-center justify-center z-10`}>
                {progress >= 100 ? (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <span className="text-white text-xs">4</span>
                )}
              </div>
              <span className="text-xs mt-1">Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;
