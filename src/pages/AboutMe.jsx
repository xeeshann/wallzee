import React, { useState } from 'react';
import SEO from '../components/SEO';
import { createOrganizationSchema } from '../utils/schema';

const AboutMe = () => {
  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 4000);
  };
  return (
    <div className="container mx-auto px-4 py-12">
      <SEO 
        title="About Us"
        description="Learn about Wallzee, the leading platform for high-quality HD wallpapers and backgrounds. Our mission is to provide beautiful wallpapers for all devices."
        canonicalUrl="https://wallzee.live/about-us"
        keywords={[
          'about Wallzee', 'Wallzee team', 'wallpaper company', 
          'who we are', 'our mission', 'wallpaper creators'
        ]}
        ogImage="https://wallzee.live/images/og-about.jpg"
      >
        <script type="application/ld+json">
          {JSON.stringify(createOrganizationSchema())}
        </script>
      </SEO>
      
      {/* Hero section with background */}
      <div className="hero min-h-[45vh] bg-gradient-to-r from-primary to-secondary rounded-box mb-12 flex items-center justify-center animate-fade-in">
        <div className="hero-content text-center text-base-100">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold mb-2 drop-shadow-lg">About WallZee</h1>
            <p className="py-4 text-lg opacity-90">
              Discover the story behind the perfect wallpapers for your devices. We blend creativity, technology, and passion to bring you the best digital art.
            </p>
          </div>
        </div>
      </div>

      {/* Team section with social links and quote */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 animate-fade-in-up">
        <div className="flex flex-col items-center">
          <div className="avatar mb-4">
            <div className="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://img.freepik.com/free-photo/male-indian-programmer-working-desktop-computer-white-desk-office_231208-3636.jpg?t=st=1731049953~exp=1731053553~hmac=269a97df761363c102856a9d0c8a3e3aa34c90eb4e5712973c3fd42ce8b3e998&w=826" alt="Founder" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Zeeshan</h2>
          <p className="text-lg text-center opacity-75 mb-2">Founder & Developer</p>
          <div className="flex gap-4 mt-2">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary"><i className="fa-brands fa-twitter fa-lg"></i></a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary"><i className="fa-brands fa-github fa-lg"></i></a>
            <a href="mailto:info@wallstore.com" className="text-primary hover:text-secondary"><i className="fa-solid fa-envelope fa-lg"></i></a>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="card bg-base-100 shadow-xl animate-fade-in-up">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Our Mission</h2>
              <p className="text-lg mb-4">
                At WallStore, we believe your screens deserve the best artwork. We curate stunning wallpapers from around the world to transform your digital experience.
              </p>
              <p className="text-lg">
                Since our launch in 2025, we've helped thousands of users personalize their devices with carefully selected high-quality wallpapers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform animate-fade-in-up">
          <div className="card-body items-center text-center">
            <div className="card-title mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Creativity</h2>
            <p>We celebrate creativity in all its forms, showcasing diverse artistic styles and design approaches.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform animate-fade-in-up delay-100">
          <div className="card-body items-center text-center">
            <div className="card-title mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Innovation</h2>
            <p>We constantly explore new design trends and technologies to provide fresh and exciting wallpapers.</p>
          </div>
        </div>
        <div className="card bg-base-100 shadow-xl hover:scale-105 transition-transform animate-fade-in-up delay-200">
          <div className="card-body items-center text-center">
            <div className="card-title mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Quality</h2>
            <p>We never compromise on quality, ensuring every wallpaper looks stunning on any device.</p>
          </div>
        </div>
      </div>

     

      {/* FAQ Section with improved accordion */}
      <div className="mb-16 animate-fade-in">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="join join-vertical w-full">
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
            <input type="checkbox" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Are all wallpapers free to download?
            </div>
            <div className="collapse-content">
              <p>Yes, all wallpapers on WallStore are completely free to download and use on your personal devices.</p>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border border-base-300 bg-base-100">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              How often do you add new wallpapers?
            </div>
            <div className="collapse-content">
              <p>We add new wallpapers every day, with major collection updates at the beginning of each month.</p>
            </div>
          </div>
          
        </div>
      </div>

     
      
    </div>
  );
};

export default AboutMe;
