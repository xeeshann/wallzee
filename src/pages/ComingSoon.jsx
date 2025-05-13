import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const location = useLocation();
  const requestedPath = location.pathname;

  // Extract the page name from the path for display
  const pageName = requestedPath.split('/').pop().replace(/-/g, ' ');
  const formattedPageName = pageName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-2xl bg-base-100 rounded-box shadow-xl p-8 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">Coming Soon!</h1>
        
        <div className="text-8xl mb-8 opacity-80">
          🚧
        </div>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          {formattedPageName || "This Page"} is Under Construction
        </h2>
        
        <p className="text-lg opacity-80 mb-8">
          We're working hard to bring you amazing content. This section will be available soon!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
            </svg>
            Return Home
          </Link>
          
          <Link to="/phone-wallpapers" className="btn btn-outline">
            Browse Wallpapers
          </Link>
        </div>
        
        <div className="divider my-8">OR</div>
        
        <div className="text-sm opacity-70">
          <p>Looking for something specific?</p>
          <div className="flex flex-wrap gap-2 justify-center mt-3">
            <Link to="/phone-wallpapers" className="badge badge-outline p-3 hover:bg-base-200">Phone Wallpapers</Link>
            <Link to="/desktop-wallpapers" className="badge badge-outline p-3 hover:bg-base-200">Desktop Wallpapers</Link>
            <Link to="/about-us" className="badge badge-outline p-3 hover:bg-base-200">About Us</Link>
            <Link to="/contact" className="badge badge-outline p-3 hover:bg-base-200">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
