// src/pages/Shop.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import { useProducts } from '../hooks/useProducts';

const categories = ['All', 'Laptops', 'Smartphones', 'Headphones', 'Smartwatches'];



export default function Shop() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter');
  const [searchTerm, setSearchTerm] = useState('');
  const [isNewArrivals, setIsNewArrivals] = useState(false);
  const [, setCartCount] = useState(0);
  const { getProductsByCategory } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  // Update filter state when URL changes
  useEffect(() => {
    setIsNewArrivals(filter === 'new-arrivals');
  }, [filter]);

const filteredProducts = getProductsByCategory(selectedCategory).filter(product => {
    return searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Render the active filter tag
  const renderActiveFilter = () => {
    if (!isNewArrivals) return null;
    
    return (
      <div className="container mx-auto px-4 py-2">
        <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          <span>New Arrivals</span>
          <button 
            onClick={() => window.history.pushState({}, '', '/shop')}
            className="ml-2 text-blue-500 hover:text-blue-700"
            aria-label="Clear new arrivals filter"
          >
            ×
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      {/* Header */}
      <header className="bg-[#253900] text-white sticky top-0 z-10 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">
            {isNewArrivals ? 'New Arrivals' : 'TechStore'}
          </h1>
        </div>
        {renderActiveFilter()}
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#253900] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#253900] focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {isNewArrivals ? 'No new arrivals found' : 'No products found'}
            </h3>
            <p className="text-gray-500">
              {isNewArrivals 
                ? 'Check back soon for new arrivals!' 
                : 'Try adjusting your search or filter criteria.'}
            </p>
            {isNewArrivals && (
              <button
                onClick={() => window.location.href = '/shop'}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                View All Products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group"
              >
                <div className="relative h-60">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2Y1ZjVmNyIvPjx0ZXh0IHg9IjI1MCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNjY2MiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIGltYWdlIGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                    <FiHeart className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                    <span className="text-xs text-white bg-[#08CB00] px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <div className="flex gap-2">
                      <button 
                        className="px-3 py-1.5 text-sm bg-[#253900] text-white rounded-lg hover:bg-[#1a2a00] transition-colors"
                        onClick={() => setCartCount(c => c + 1)}
                      >
                        Add to Cart
                      </button>
                      <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <FiShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1d1d1f] text-[#f5f5f7] py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Footer sections */}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>Copyright © 2025 TechStore Inc. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Privacy Policy</a>
                <a href="#" className="hover:text-white">Terms of Use</a>
                <a href="#" className="hover:text-white">Sales and Refunds</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}