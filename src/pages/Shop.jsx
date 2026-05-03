import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { useProducts } from '../hooks/useProducts'; 
import ProductCard from '../components/ProductCard'; 

const categories = ['All', 'Laptops', 'Smartphones', 'Headphones', 'Smartwatches'];

const categoryAliasMap = {
  'Laptops & PCs': 'Laptops',
  Audio: 'Headphones',
  Wearables: 'Smartwatches',
};

const slugCategoryMap = {
  'laptops-pcs': 'Laptops',
  smartphones: 'Smartphones',
  gaming: 'Gaming',
  audio: 'Headphones',
  wearables: 'Smartwatches',
};

const resolveCategory = (value) => categoryAliasMap[value] ?? value;

export default function Shop() {
  const { slug } = useParams(); 
  const [searchParams] = useSearchParams();
  const { getProductsByCategory } = useProducts(); 
  const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal State for Quick View
  const [modalProduct, setModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const urlSearch = searchParams.get('search') ?? '';
  const urlCategory = searchParams.get('cat') ?? '';

  useEffect(() => {
    const nextCategory = resolveCategory(urlCategory || slugCategoryMap[slug] || 'All');
    setSearchTerm(urlSearch);
    setSelectedCategory(nextCategory);
  }, [slug, urlCategory, urlSearch]);

  const activeCategory = resolveCategory(selectedCategory);
  const categoryProducts = getProductsByCategory(activeCategory);

  const filteredProducts = categoryProducts.filter(product => {
    const matchesSearch = searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Action Handlers
  const handleAddToCart = (product) => {
    dispatch(addItemToCart({
      id: product.id,
      name: product.name,
      price: product.onSale ? product.salePrice : product.price,
      image: product.image,
      quantity: 1
    }));
  };

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product));
  };

  const openModal = (product) => {
    setModalProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] pt-10">
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter UI */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08CB00]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#08CB00] cursor-pointer outline-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
                onAddToWishlist={() => handleAddToWishlist(product)}
                onQuickView={() => openModal(product)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Quick View Modal Implementation */}
      {isModalOpen && modalProduct && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10 cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="p-8 md:flex gap-8">
              <div className="md:w-1/2">
                <img src={modalProduct.image} alt={modalProduct.name} className="w-full h-auto rounded-xl object-contain bg-gray-50" />
              </div>
              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4">{modalProduct.name}</h2>
                <p className="text-gray-600 mb-6">{modalProduct.description}</p>
                <div className="text-2xl font-bold text-[#08CB00] mb-8">
                  ${modalProduct.onSale ? modalProduct.salePrice : modalProduct.price}
                  {modalProduct.onSale && (
                    <span className="ml-3 text-base font-medium text-gray-500 line-through">${modalProduct.price}</span>
                  )}
                </div>
                <button 
                  onClick={() => { handleAddToCart(modalProduct); closeModal(); }}
                  className="w-full bg-[#253900] text-white py-4 rounded-xl font-bold hover:bg-[#08CB00] transition-colors cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}