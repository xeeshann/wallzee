import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  // Get the current year for the copyright notice
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-base-200/30 py-12 px-4">
      {/* Hero section with background */}
      <div className="hero bg-gradient-to-r from-secondary/20 to-primary/20 rounded-box mb-12 py-16">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Privacy Policy</h1>
            <p className="py-4 text-lg opacity-80">
              Last Updated: May 13, 2025
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-box overflow-hidden">
        <div className="p-2 bg-gradient-to-r from-secondary to-primary"></div>
        <div className="p-6 md:p-10">
          <div className="prose max-w-none">
            <div className="alert alert-success shadow-lg mb-8">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <h3 className="font-bold">Your Privacy Is Important To Us</h3>
                  <div className="text-sm">Wallzee does not collect personal information from our users</div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-secondary">Our Approach to Privacy</h2>
            <p>
              At Wallzee, we believe in simplicity and transparency. We've designed our service to provide beautiful wallpapers without requiring any personal information from you.
            </p>

            <div className="card bg-base-200 shadow-sm p-5 my-6">
              <h3 className="text-xl font-semibold mb-3">Key Privacy Points</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>We don't collect personal information</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No account registration required</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No tracking of your browsing habits</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-success mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No personal data is sold or shared</span>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-bold mt-8">What Information We Collect</h3>
            <div className="pl-4 border-l-4 border-secondary/30 mb-8">
              <p>
                <strong>Anonymous Usage Data:</strong> We may collect anonymous statistics about how users interact with our website (such as which wallpapers are most popular). This data cannot be used to identify you personally.
              </p>
              <p>
                <strong>Server Logs:</strong> Like most websites, our servers automatically record basic information when you visit, such as your IP address, browser type, and visited pages. This helps us maintain and improve our service.
              </p>
            </div>

            <h3 className="text-xl font-bold">How We Use This Information</h3>
            <div className="pl-4 border-l-4 border-primary/30 mb-8">
              <p>We use anonymous usage data solely to:</p>
              <ul>
                <li>Improve our website functionality and user experience</li>
                <li>Understand which wallpapers are most popular</li>
                <li>Troubleshoot technical issues</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold">Cookies</h3>
            <div className="pl-4 border-l-4 border-info/30 mb-8">
              <p>
                Our website uses minimal cookies that are necessary for the website to function properly. These cookies do not collect personal information. You can adjust your browser settings to refuse cookies, but this may limit some functionality.
              </p>
            </div>

            <h3 className="text-xl font-bold">Third-Party Services</h3>
            <div className="pl-4 border-l-4 border-warning/30 mb-8">
              <p>
                We may use third-party services to help operate our website (such as hosting providers). These services may collect anonymous usage data, but they cannot identify you personally.
              </p>
            </div>

            <h3 className="text-xl font-bold">Changes to This Privacy Policy</h3>
            <div className="pl-4 border-l-4 border-error/30 mb-8">
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page. Any changes will be effective immediately upon posting.
              </p>
            </div>

            <h3 className="text-xl font-bold">Contact Us</h3>
            <div className="pl-4 border-l-4 border-success/30 mb-8">
              <p>
                If you have any questions about our privacy practices, please contact us at:
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
        <Link to="/terms" className="btn btn-outline">
          Terms of Service
        </Link>
      </div>

      {/* Footer Note */}
      <div className="max-w-4xl mx-auto text-center text-sm opacity-70 mt-12">
        <p>© {currentYear} Wallzee. All rights reserved.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
         
