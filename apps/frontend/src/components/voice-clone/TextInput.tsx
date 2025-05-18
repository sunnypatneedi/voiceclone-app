import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

/**
 * Props interface for the TextInput component
 */
interface TextInputProps {
  /** ID of the voice sample to use for cloning */
  sampleId: string;
  /** Callback function when a clone job is successfully created */
  onJobCreated: (jobId: string) => void;
}

/**
 * TextInput component for entering and submitting text to be synthesized
 * Allows users to input text and send it to the backend for voice cloning
 * 
 * @param props Component properties
 * @returns The TextInput component
 */
const TextInput: React.FC<TextInputProps> = ({
  sampleId,
  onJobCreated
}): JSX.Element => {
  // Access global app context
  const { setIsLoading, setError } = useAppContext();
  
  // Local state
  const [text, setText] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const MAX_CHARS = 500;

  /**
   * Handle text change in the textarea
   * @param e The change event
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    
    // Enforce character limit
    if (newText.length <= MAX_CHARS) {
      setText(newText);
      setCharCount(newText.length);
    }
  };

  /**
   * Submit the text for voice cloning
   */
  const handleSubmit = async () => {
    // Validate input
    if (!text.trim()) {
      setError('Please enter some text to convert to speech.');
      return;
    }

    try {
      setIsLoading(true);
      
      // In a real implementation, this would call the API service
      // to create a clone job with the provided text and sample ID
      
      // Simulate API call with a setTimeout
      setTimeout(() => {
        // Generate a random job ID for demo purposes
        const jobId = `job_${Math.random().toString(36).substring(2, 11)}`;
        
        setIsLoading(false);
        onJobCreated(jobId);
      }, 1500);
      
    } catch (error) {
      setIsLoading(false);
      setError('Failed to process text. Please try again.');
      console.error('Clone job creation error:', error);
    }
  };

  /**
   * Get character count status class based on remaining characters
   * @returns CSS class name
   */
  const getCharCountClass = () => {
    if (charCount > MAX_CHARS * 0.9) {
      return 'text-red-500';
    } else if (charCount > MAX_CHARS * 0.7) {
      return 'text-orange-500';
    }
    return 'text-gray-500';
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Enter Text to Speak</h2>
      <p className="text-gray-600 mb-6">
        Type or paste the text you want to convert to speech using your voice.
      </p>
      
      {/* Text input */}
      <div className="mb-4">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
          placeholder="Enter text here (max 500 characters)..."
          value={text}
          onChange={handleTextChange}
        />
        <div className={`text-right text-sm mt-1 ${getCharCountClass()}`}>
          {charCount}/{MAX_CHARS} characters
        </div>
      </div>
      
      {/* Example suggestions */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Try one of these examples:</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setText("Hello, this is my cloned voice. I hope you're having a great day!");
              setCharCount(63);
            }}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition"
          >
            Greeting
          </button>
          <button
            onClick={() => {
              setText("This is a demonstration of voice cloning technology using artificial intelligence.");
              setCharCount(81);
            }}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition"
          >
            Demo
          </button>
          <button
            onClick={() => {
              setText("The quick brown fox jumps over the lazy dog. This sentence contains every letter in the English alphabet.");
              setCharCount(99);
            }}
            className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition"
          >
            Pangram
          </button>
        </div>
      </div>
      
      {/* Submit button */}
      <button
        className="btn btn-primary w-full py-3"
        onClick={handleSubmit}
        disabled={!text.trim()}
      >
        Generate Speech
      </button>
    </div>
  );
};

export default TextInput;
