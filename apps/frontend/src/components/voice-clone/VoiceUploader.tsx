import React, { useState, useRef, ChangeEvent } from 'react';
import { useAppContext } from '../../context/AppContext';

/**
 * Props interface for the VoiceUploader component
 */
interface VoiceUploaderProps {
  /** Callback function when a sample is successfully uploaded */
  onSampleUploaded: (sampleId: string) => void;
}

/**
 * VoiceUploader component for handling voice sample file uploads
 * Provides file selection, validation, and upload functionality
 * 
 * @param props Component properties
 * @returns The VoiceUploader component
 */
const VoiceUploader: React.FC<VoiceUploaderProps> = ({ 
  onSampleUploaded 
}): JSX.Element => {
  // App context for global state access
  const { setIsLoading, setError } = useAppContext();
  
  // Component state
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [consentChecked, setConsentChecked] = useState<boolean>(false);
  
  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle file selection from the file input
   * @param event The change event from the file input
   */
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  /**
   * Validates the selected file and updates state if valid
   * @param selectedFile The file to validate
   */
  const validateAndSetFile = (selectedFile: File) => {
    // Check file type
    const validTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3'];
    if (!validTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Please upload a WAV or MP3 file.');
      return;
    }

    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (selectedFile.size > maxSize) {
      setError('File too large. Maximum size is 10MB.');
      return;
    }

    // File is valid, update state
    setFile(selectedFile);
    setError(null);
  };

  /**
   * Triggers the hidden file input click event
   */
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * Handles the file upload process
   */
  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    if (!consentChecked) {
      setError('Please agree to the terms before uploading.');
      return;
    }

    try {
      setIsLoading(true);
      
      // In a real implementation, this would upload the file to the server
      // using the API service
      
      // Simulate API call with a setTimeout
      setTimeout(() => {
        // Generate a random sample ID for demo purposes
        const sampleId = `sample_${Math.random().toString(36).substring(2, 11)}`;
        
        setIsLoading(false);
        onSampleUploaded(sampleId);
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      setError('Failed to upload file. Please try again.');
      console.error('Upload error:', error);
    }
  };

  // Handle drag events for the drop zone
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /**
   * Handles file drop event
   * @param e The drop event
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload Voice Sample</h2>
      <p className="text-gray-600 mb-6">
        Upload a 5-10 second audio clip of your voice. For best results, use a clear recording
        with minimal background noise.
      </p>
      
      {/* File drop zone */}
      <div 
        className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".wav,.mp3"
          className="hidden"
        />
        
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-12 w-12 mx-auto text-gray-400 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        
        <p className="mb-2 font-semibold">
          {file ? file.name : 'Drop your audio file here or click to browse'}
        </p>
        <p className="text-sm text-gray-500">
          Supported formats: WAV, MP3 (Max 10MB)
        </p>
      </div>
      
      {/* File info */}
      {file && (
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="font-medium">Selected file:</p>
          <p className="text-sm text-gray-600">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</p>
        </div>
      )}
      
      {/* Consent checkbox */}
      <div className="mb-6">
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={consentChecked}
            onChange={() => setConsentChecked(!consentChecked)}
            className="mt-1 mr-2"
          />
          <span className="text-sm text-gray-600">
            I understand that my voice sample will be processed to create a cloned voice.
            The sample may be stored for up to 30 days and then automatically deleted.
          </span>
        </label>
      </div>
      
      {/* Upload button */}
      <button
        className="btn btn-primary w-full py-3"
        onClick={handleUpload}
        disabled={!file || !consentChecked}
      >
        Upload and Process Voice
      </button>
    </div>
  );
};

export default VoiceUploader;
