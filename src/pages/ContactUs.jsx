import React, { useState } from 'react';
import useWeb3Forms from '@web3forms/react';
import SEO from '../components/SEO';
import { createOrganizationSchema } from '../utils/schema';

const ContactUs = () => {  // Form state management
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize Web3Forms hook
  const { submit, loading } = useWeb3Forms({
    access_key: '2d663180-53ce-4ff7-9272-cc2cddfa1b20', // Your Access Key from web3forms.com
    settings: {
      from_name: 'Wallzee Contact Form',
      subject: 'New Contact Form Submission from Wallzee App',
      to_email: 'teelizeeshan303@gmail.com',
    },
    onSuccess: (message, data) => {
      console.log("Success:", message);
      console.log("Form data:", data);
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error) => {
      console.error("Error:", error);
      setError(error || 'Something went wrong. Please try again later.');
    }
  });

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };
  // Handle form submission with Web3Forms
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    
    // Use the hook to submit the form
    await submit({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      botcheck: '',
    });
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title="Contact Us"
        description="Get in touch with the Wallzee team. Contact us for support, feedback, or business inquiries related to our wallpaper collection."
        canonicalUrl="https://wallzee.live/contact"
        keywords={[
          'contact Wallzee', 'Wallzee support', 'wallpaper help', 
          'feedback', 'business inquiries', 'contact form'
        ]}
        ogImage="https://wallzee.live/images/og-contact.jpg"
      >
        <script type="application/ld+json">
          {JSON.stringify(createOrganizationSchema())}
        </script>
      </SEO>
      
      {/* Hero section with background */}
      <div className="hero min-h-[40vh] bg-gradient-to-br from-primary via-accent/40 to-secondary rounded-box mb-12 flex items-center justify-center animate-fade-in">
        <div className="hero-content text-center text-base-100">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold mb-2 drop-shadow-lg">Contact Us</h1>
            <p className="py-4 text-lg opacity-90 text-blue-600">
              We'd love to hear from you! Whether you have a question, suggestion, or want to collaborate, 
              our team is ready to assist you.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information and Form Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Contact Information */}
        <div className="card bg-base-100 shadow-xl h-full">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Get In Touch</h2>
            
            <div className="space-y-6">
              {/* Email Contact */}
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-primary h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-sm opacity-75 mt-1">For general inquiries and support</p>
                  <a href="mailto:xeeshannteeli@gmail.com" className="text-secondary hover:underline mt-2 inline-block">
                    xeeshannteeli@gmail.com
                  </a>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-secondary h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Social Media</h3>
                  <p className="text-sm opacity-75 mt-1">Follow us for updates and inspiration</p>
                  <div className="flex mt-3 space-x-3">
                    <a href="#" className="bg-base-200 hover:bg-primary/20 p-2 rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-base-200 hover:bg-primary/20 p-2 rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                      </svg>
                    </a>
                    <a href="#" className="bg-base-200 hover:bg-primary/20 p-2 rounded-full transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-accent h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Business Hours</h3>
                  <p className="text-sm opacity-75 mt-1">We respond to inquiries during:</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">Monday - Friday: 9 AM - 6 PM</p>
                    <p className="text-sm">Saturday: 10 AM - 4 PM</p>
                    <p className="text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="mt-8">
              <div className="p-4 bg-base-200 rounded-lg">
                <h3 className="font-semibold mb-2">Looking for answers?</h3>
                <p className="text-sm opacity-75 mb-3">Check our Frequently Asked Questions page for quick answers to common questions.</p>
                <a href="/faq" className="btn btn-sm btn-outline btn-primary">Visit FAQ</a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input 
                  type="text" 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  className="input input-bordered w-full" 
                  placeholder="John Doe"
                  required 
                />
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="input input-bordered w-full" 
                  placeholder="your.email@example.com"
                  required 
                />
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input 
                  type="text" 
                  name="subject" 
                  value={form.subject} 
                  onChange={handleChange} 
                  className="input input-bordered w-full" 
                  placeholder="How can we help you?"
                  required 
                />
              </div>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea 
                  name="message" 
                  value={form.message} 
                  onChange={handleChange} 
                  className="textarea textarea-bordered w-full h-36" 
                  placeholder="Please provide details about your inquiry..."                  required
                ></textarea>
              </div>
              
              {/* Honeypot field to prevent spam */}
              <div className="form-control mb-4" style={{ display: 'none' }}>
                <input
                  type="checkbox" 
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                />
              </div>
              
              {/* Terms acceptance */}
              <div className="form-control mb-4">
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" required className="checkbox checkbox-primary checkbox-sm" />
                  <span className="label-text">I agree to the <a href="/terms" className="link link-primary">Terms of Service</a> and <a href="/privacy" className="link link-primary">Privacy Policy</a></span>
                </label>
              </div>
              
              {error && (
                <div className="alert alert-error mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
              
              {submitted && (
                <div className="alert alert-success mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Your message has been sent! We'll get back to you soon.</span>
                </div>              )}
              
              <button 
                type="submit" 
                className="btn btn-primary w-full mt-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

    

      {/* Newsletter Signup */}
      <div className="card bg-gradient-to-r from-primary/20 to-secondary/20 shadow-xl mb-8">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="card-title text-2xl mb-2">Stay Updated</h2>
              <p className="opacity-75">Subscribe to our newsletter for the latest wallpapers and updates.</p>
            </div>
            <div className="form-control w-full md:w-auto">
              <div className="join">
                <input type="email" placeholder="Your email address" className="input input-bordered join-item w-full md:w-64" />
                <button className="btn btn-primary join-item">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
