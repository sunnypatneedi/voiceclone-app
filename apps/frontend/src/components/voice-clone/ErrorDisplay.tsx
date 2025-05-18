import React from 'react';

/**
 * Props interface for the ErrorDisplay component
 */
interface ErrorDisplayProps {
  /** Error message to display */
  error: string;
  /** Callback function for retry action */
  onRetry: () => void;
}

/**
 * ErrorDisplay component for showing error messages with a retry option
 * Provides clear error visualization and recovery path for users
 * 
 * @param props Component properties
 * @returns The ErrorDisplay component
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  onRetry
}): JSX.Element => {
  return (
    <div className="p-6 flex flex-col items-center text-center">
      {/* Error icon */}
      <div className="mb-6 text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h2>
      
      {/* Error message */}
      <p className="text-gray-600 mb-6">
        {error}
      </p>
      
      {/* Common error solutions */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left w-full">
        <h3 className="font-medium text-gray-900 mb-2">Try these solutions:</h3>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Check your audio file format (WAV or MP3 only)</li>
          <li>Ensure your sample is at least 5 seconds long</li>
          <li>Make sure your internet connection is stable</li>
          <li>Refresh the page and try again</li>
        </ul>
      </div>
      
      {/* Retry button */}
      <button
        onClick={onRetry}
        className="btn btn-primary"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorDisplay;
