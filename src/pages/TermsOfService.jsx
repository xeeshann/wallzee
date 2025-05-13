import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-base-200/30 py-12 px-4">
      {/* Hero section with background */}
      <div className="hero bg-gradient-to-r from-primary/20 to-secondary/20 rounded-box mb-12 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Terms of Service</h1>
            <p className="py-4 text-lg opacity-80">
              Last Updated: May 13, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-box overflow-hidden">
        <div className="p-2 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="p-6 md:p-10">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-primary">Welcome to Wallzee</h2>
            <p>
              By accessing and using our website and services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <div className="divider"></div>

            <div className="card bg-base-200 shadow-sm p-5 my-6">
              <h3 className="text-xl font-semibold mb-3">Key Points</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="badge badge-primary mr-2 mt-1">1</span> 
                  <span>Wallpapers are for <strong>personal use only</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="badge badge-primary mr-2 mt-1">2</span> 
                  <span>Commercial use is <strong>prohibited</strong> without permission</span>
                </li>
                <li className="flex items-start">
                  <span className="badge badge-primary mr-2 mt-1">3</span> 
                  <span>We don't collect personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="badge badge-primary mr-2 mt-1">4</span> 
                  <span>Redistribution of wallpapers is not allowed</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-bold">1. Wallpaper Usage</h3>
            <div className="pl-4 border-l-4 border-primary/30 mb-8">
              <p>
                All wallpapers on Wallzee are provided for <strong>personal, non-commercial use only</strong>. 
                You may download and use wallpapers on your personal devices, but you may not:
              </p>
              <ul>
                <li>Sell or redistribute the wallpapers</li>
                <li>Use wallpapers in commercial products or services</li>
                <li>Remove watermarks or modify wallpapers to claim ownership</li>
                <li>Use wallpapers in any way that generates profit</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold">2. Intellectual Property</h3>
            <div className="pl-4 border-l-4 border-secondary/30 mb-8">
              <p>
                All wallpapers, designs, and content on Wallzee remain the property of their respective owners. 
                Downloading wallpapers does not transfer any ownership rights to you.
              </p>
            </div>

            <h3 className="text-xl font-bold">3. Prohibited Activities</h3>
            <div className="pl-4 border-l-4 border-error/30 mb-8">
              <p>When using Wallzee, you agree not to:</p>
              <ul>
                <li>Attempt to bypass any security measures</li>
                <li>Use automated systems to scrape or download content in bulk</li>
                <li>Interfere with the proper functioning of the website</li>
                <li>Upload or share inappropriate or illegal content</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold">4. Changes to Terms</h3>
            <div className="pl-4 border-l-4 border-info/30 mb-8">
              <p>
                We may update these terms from time to time. Significant changes will be announced on our website.
                Your continued use of Wallzee after changes indicates your acceptance of the updated terms.
              </p>
            </div>

            <h3 className="text-xl font-bold">5. Disclaimer</h3>
            <div className="pl-4 border-l-4 border-warning/30 mb-8">
              <p>
                Wallzee is provided "as is" without warranties of any kind. We cannot guarantee that the website 
                will be error-free or continuously available. 
              </p>
            </div>

            <h3 className="text-xl font-bold">6. Contact Us</h3>
            <div className="pl-4 border-l-4 border-success/30 mb-8">
              <p>
                If you have questions about these terms, please contact us at:
              </p>
              <p className="font-medium">
                xeeshannteeli@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Homepage */}
      <div className="flex justify-center gap-4 mt-12">
        <Link to="/" className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
          </svg>
          Home
        </Link>
        <Link to="/privacy" className="btn btn-outline">
          Privacy Policy
        </Link>
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto text-center text-sm opacity-70 mt-12">
        <p>© {currentYear} Wallzee. All rights reserved.</p>
      </div>
    </div>
  );
};

export default TermsOfService;



