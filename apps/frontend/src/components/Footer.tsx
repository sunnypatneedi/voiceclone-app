import React from 'react';

/**
 * Footer component for the application
 * Displays copyright information and links
 * 
 * @returns {JSX.Element} Footer component
 */
const Footer: React.FC = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright section */}
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            © {currentYear} Voice Clone App. All rights reserved.
          </div>
          
          {/* Links section */}
          <div className="flex space-x-4">
            <a 
              href="https://github.com/sunnypatneedi/voiceclone-app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-primary-600 transition duration-150"
              aria-label="GitHub repository"
            >
              GitHub
            </a>
            <a 
              href="#privacy" 
              className="text-sm text-gray-600 hover:text-primary-600 transition duration-150"
            >
              Privacy Policy
            </a>
            <a 
              href="#terms" 
              className="text-sm text-gray-600 hover:text-primary-600 transition duration-150"
            >
              Terms of Service
            </a>
          </div>
        </div>
        
        {/* Additional information */}
        <div className="mt-4 text-xs text-center text-gray-500">
          This is an open-source demo application. Voice samples are processed using Cartesia and PipeCat.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
