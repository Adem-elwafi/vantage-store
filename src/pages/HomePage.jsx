import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GiftIdeas from '../components/GiftIdeas';
import Bestsellers from '../components/BestSellers';
import Features from '../components/Features';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';

// Add proper alt text for the background image
const heroBackgroundImage = {
  url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  alt: 'Modern technology devices on a desk'
};

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0 z-0 bg-blur">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${heroBackgroundImage.url})` }}
            role="img"
            aria-label={heroBackgroundImage.alt}
          />
        </div>
        
        <div className="relative z-10 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl py-24 sm:py-32 lg:py-40">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-4 py-1 text-sm leading-6 text-white ring-1 ring-white/20 hover:ring-white/50 transition-all duration-300">
                Introducing our latest tech collection.{' '}
                <Link to="/shop?filter=new-arrivals" className="font-semibold text-white hover:text-gray-200 transition-colors">
                  <span className="absolute inset-0" aria-hidden="true"></span>Explore now <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-md">
                Premium Tech for the Modern World
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/90 max-w-2xl mx-auto">
                Discover cutting-edge technology and high-performance gear. From gaming rigs to productivity tools, we have everything you need to stay ahead in the digital age.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/shop"
                  className="relative cursor-pointer py-4 px-8 text-center font-barlow inline-flex justify-center text-base uppercase text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-2 focus:outline-white focus:outline-offset-4 overflow-hidden"
                  aria-label="Shop our products"
                >
                  <span className="relative z-20">Shop now</span>

                  <span
                    className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"
                    aria-hidden="true"
                  />

                  <span
                    className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"
                    aria-hidden="true"
                  />
                  <span
                    className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"
                    aria-hidden="true"
                  />
                  <span
                    className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"
                    aria-hidden="true"
                  />
                  <span
                    className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"
                    aria-hidden="true"
                  />
                </Link>

                <Link to="/categories" className="text-sm font-semibold leading-6 text-white hover:text-gray-200">
                  Browse categories <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* 1. Categories - Soft Gray Background */}
        <section aria-labelledby="categories-heading" className="bg-[#f9f9f9] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 id="categories-heading" className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">Find the perfect tech for your needs</p>
            <Categories />
          </div>
        </section>
        
        {/* 2. Bestsellers - Clean White Background */}
        <section id="bestsellers" aria-labelledby="bestsellers-heading" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="bestsellers-heading" className="text-4xl font-bold text-center mb-12 text-gray-900 uppercase tracking-tight">Best Sellers</h2>
            <Bestsellers />
          </div>
        </section>
        
        {/* 3. Features - Brand Dark Background */}
        <section id="features" aria-labelledby="features-heading" className="bg-[#253900] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 id="features-heading" className="text-3xl font-bold text-center mb-12 text-[#EEEEEE]">Why Choose Us</h2>
            <Features />
          </div>
        </section>
        
        {/* 4. Gift Ideas - Soft Gray Background */}
        <section id="gift-ideas" aria-labelledby="gift-ideas-heading" className="bg-[#f9f9f9] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="gift-ideas-heading" className="text-4xl font-bold text-[#000000] mb-3 uppercase">Perfect Tech Gifts</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Thoughtful tech gifts for every occasion and budget</p>
            </div>
            <GiftIdeas />
          </div>
        </section>
        
        {/* 5. Newsletter - Standardized Padding */}
        <section aria-labelledby="newsletter-heading" className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Newsletter />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
