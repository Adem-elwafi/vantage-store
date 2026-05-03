import React, { useState } from 'react';
import { FiMail, FiSend, FiCheck } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-[var(--color-secondary)] py-12 px-4 sm:px-6 lg:px-8 rounded-2xl border-2 border-[#000000]/10 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#000000] mb-6">
            <FiCheck className="h-8 w-8 text-[var(--color-accent)]" />
          </div>
          <h2 className="text-2xl font-bold text-[#000000] sm:text-3xl">
            You're all set!
          </h2>
          <p className="mt-3 text-[#000000] font-medium">
            Thanks for subscribing to TechTrend. You'll receive our latest updates, exclusive deals, and tech news directly to your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-secondary)] py-12 px-4 sm:px-6 lg:px-8 rounded-2xl relative overflow-hidden border-2 border-[#000000]/10 shadow-xl">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds.png')] opacity-[0.03]"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#000000] mr-3">
                <FiMail className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-sm font-bold text-[#000000] uppercase tracking-wider">
                Tech Updates
              </h3>
            </div>
            <h2 className="text-3xl font-bold text-[#000000] sm:text-4xl leading-tight">
              Stay Ahead with Our<br />Tech Newsletter
            </h2>
            <p className="mt-4 text-[#000000] text-lg font-medium">
              Get the latest tech news, product releases, and exclusive deals delivered straight to your inbox.
            </p>
          </div>
          
          <div className="lg:w-1/2 bg-white/90 p-6 rounded-xl shadow-lg border border-[#000000]/10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-[#000000]/70" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white border-2 border-[#000000]/20 text-[#000000] placeholder-[#000000]/60 rounded-lg focus:ring-2 focus:ring-[#000000] focus:border-transparent focus:outline-none sm:text-sm shadow-sm transition-all duration-200"
                  placeholder="Enter your email address"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3.5 border-2 border-transparent text-base font-bold rounded-lg text-[#000000] bg-[var(--color-accent)] hover:bg-[#FFFFFF] hover:border-[#000000]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000000] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 ${isLoading ? 'opacity-80 cursor-not-allowed' : 'shadow-md hover:shadow-lg'}`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#000000]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : (
                  <>
                    <FiSend className="mr-2 h-5 w-5" />
                    Subscribe for Updates
                  </>
                )}
              </button>
            </form>
            <p className="mt-4 text-sm text-[#000000]/80 text-center lg:text-left">
              By subscribing, you agree to our{' '}
              <a href="#" className="text-[#000000] font-bold hover:underline underline-offset-2">
                Privacy Policy
              </a>{' '}
              and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
