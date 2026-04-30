import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';

const GiftIdeas = ({ products = [], toggleCart = () => {}, toggleWishlist = () => {} }) => {
  // Safely get gift ideas or first 4 products
  const getSafeProducts = () => {
    try {
      if (!Array.isArray(products) || products.length === 0) return [];
      
      const validProducts = products.filter(product => 
        product && 
        typeof product === 'object' && 
        product.id && 
        product.title
      );
      
      if (validProducts.length === 0) return [];
      
      const giftIdeas = validProducts.filter(p => p.giftIdea);
      return giftIdeas.length > 0 ? giftIdeas : validProducts.slice(0, 4);
    } catch (error) {
      console.error('Error processing products:', error);
      return [];
    }
  };

  const giftIdeas = getSafeProducts();

  if (!giftIdeas || giftIdeas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No gift ideas available at the moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// Inside GiftIdeas.jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {giftIdeas.map((product) => (
    <ProductCard 
      key={product.id}
      product={product}
      onAddToCart={() => toggleCart(product.id)}
      onAddToWishlist={() => toggleWishlist(product.id)}
      onQuickView={() => {/* handle quick view */}}
    />
  ))}
</div>
    </div>
  );
};

GiftIdeas.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      salePrice: PropTypes.number,
      onSale: PropTypes.bool,
      bestseller: PropTypes.bool,
      rating: PropTypes.number,
      image: PropTypes.string,
      description: PropTypes.string,
      giftIdea: PropTypes.bool
    })
  ),
  cartItems: PropTypes.array,
  toggleCart: PropTypes.func
};

export default GiftIdeas;