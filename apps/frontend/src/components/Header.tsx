import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component for the application
 * Displays the app logo, name, and navigation links
 * 
 * @returns {JSX.Element} Header component
 */
const Header: React.FC = (): JSX.Element => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {/* App logo and name */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-primary-600 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" 
            />
          </svg>
          <span className="font-bold text-xl text-gray-900">Voice Clone</span>
        </Link>
        
        {/* Navigation links */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-700 hover:text-primary-600 transition duration-150">
            Home
          </Link>
          <a 
            href="https://github.com/sunnypatneedi/voiceclone-app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-primary-600 transition duration-150"
          >
            GitHub
          </a>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
