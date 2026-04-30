import React from 'react';
import { FiStar, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onQuickView }) => {
  const {  name, price, salePrice, onSale, image, rating, isNew } = product;

  return (
    <div
      className="group relative bg-[#EEEEEE] rounded-lg shadow-sm hover:shadow-lg transition p-4 snap-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#08CB00] flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px]"
      onClick={() => onQuickView(product)}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {onSale && (
          <span className="bg-[#08CB00] text-white text-[10px] uppercase px-2 py-0.5 rounded font-bold">
            Sale
          </span>
        )}
        {isNew && (
          <span className="bg-blue-600 text-white text-[10px] uppercase px-2 py-0.5 rounded font-bold">
            New
          </span>
        )}
      </div>

      {/* Wishlist Toggle */}
      <button 
        className="absolute top-2 right-2 text-[#000000] hover:text-[#08CB00] transition z-20 p-1 bg-white/50 rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          onAddToWishlist(product);
        }}
        aria-label="Add to wishlist"
      >
        <FiHeart className="w-5 h-5" />
      </button>

      {/* Product Image */}
      <div className="overflow-hidden rounded-md aspect-square bg-white flex items-center justify-center">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain transform group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Info Section */}
      <h3 className="mt-4 text-lg font-medium text-[#000000] line-clamp-1">{name}</h3>
      
      <div className="mt-1 flex items-center space-x-2">
        <span className="text-xl font-semibold text-[#08CB00]">
          ${onSale ? salePrice : price}
        </span>
        {onSale && (
          <span className="line-through text-gray-500 text-sm">${price}</span>
        )}
      </div>

      {/* Rating */}
      <div className="mt-2 flex items-center">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="flex-1 bg-[#253900] text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-[#08CB00] transition"
        >
          <FiShoppingCart /> Add
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="bg-white text-[#000000] border border-gray-200 py-2 px-3 rounded hover:bg-gray-100 transition"
          aria-label="Quick view"
        >
          <FiEye />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;