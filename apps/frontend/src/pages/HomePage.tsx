import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomePage component that serves as the landing page for the application
 * Displays a hero section with a call-to-action to start using the voice cloning feature
 * 
 * @returns {JSX.Element} The HomePage component
 */
const HomePage: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col space-y-12">
      {/* Hero section */}
      <section className="flex flex-col items-center text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Clone Your Voice with AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-8">
          Upload a short audio sample and convert any text to speech using your own voice.
          No training required - get results in seconds.
        </p>
        <Link 
          to="/voice-clone" 
          className="btn btn-primary px-8 py-3 text-lg"
        >
          Get Started
        </Link>
      </section>

      {/* Features section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card flex flex-col items-center text-center">
          <div className="bg-blue-100 p-4 rounded-full mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-blue-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Quick and Easy</h2>
          <p className="text-gray-600">
            Just upload a short 5-10 second audio clip of your voice and start converting text to speech.
          </p>
        </div>

        <div className="card flex flex-col items-center text-center">
          <div className="bg-green-100 p-4 rounded-full mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-green-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">High Quality</h2>
          <p className="text-gray-600">
            Advanced AI processing ensures natural-sounding speech with proper intonation and rhythm.
          </p>
        </div>

        <div className="card flex flex-col items-center text-center">
          <div className="bg-purple-100 p-4 rounded-full mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-purple-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Secure Processing</h2>
          <p className="text-gray-600">
            Your voice samples are processed securely and you can delete them at any time.
          </p>
        </div>
      </section>

      {/* How it works section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <span className="font-bold text-gray-700">1</span>
            </div>
            <h3 className="font-semibold mb-2">Upload</h3>
            <p className="text-sm text-gray-600">Upload a short voice sample (5-10 seconds)</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <span className="font-bold text-gray-700">2</span>
            </div>
            <h3 className="font-semibold mb-2">Process</h3>
            <p className="text-sm text-gray-600">Our AI processes and analyzes your voice</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <span className="font-bold text-gray-700">3</span>
            </div>
            <h3 className="font-semibold mb-2">Input Text</h3>
            <p className="text-sm text-gray-600">Enter the text you want to convert to speech</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <span className="font-bold text-gray-700">4</span>
            </div>
            <h3 className="font-semibold mb-2">Listen & Download</h3>
            <p className="text-sm text-gray-600">Play and download the generated audio</p>
          </div>
        </div>
      </section>
      
      {/* Call to action */}
      <section className="bg-gray-100 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to try it out?</h2>
        <p className="text-gray-600 mb-6">
          Experience the power of AI voice cloning technology.
        </p>
        <Link 
          to="/voice-clone" 
          className="btn btn-primary px-6 py-2"
        >
          Start Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
