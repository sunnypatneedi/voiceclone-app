import React from 'react';
import { Link } from 'react-router-dom';

/**
 * NotFoundPage component shown when a route doesn't match any defined routes
 * Provides a way for users to navigate back to the home page
 * 
 * @returns {JSX.Element} The NotFoundPage component
 */
const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-24 w-24 text-gray-400 mb-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1.5} 
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="btn btn-primary"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
