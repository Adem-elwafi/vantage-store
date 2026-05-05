import React, { useCallback, useState } from 'react';
import { FiStar, FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../features/wishlist/wishlistSlice';

const ProductCard = ({
  product,
  onAddToCart = () => {},
  onAddToWishlist = () => {},
  onQuickView = () => {},
  layout = 'carousel',
}) => {
  const { name, price, salePrice, onSale, image, rating, isNew } = product;
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const displayPrice = onSale ? salePrice : price;
  const cardWidthClass = layout === 'grid'
    ? 'w-full min-w-0'
    : 'flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] lg:w-[320px]';
  
  // Check if product is already in wishlist
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isFavorite = wishlistItems.some(item => item.id === product.id);

  const handleWishlistClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (isFavorite) {
      // Remove from wishlist
      dispatch(removeFromWishlist(product.id));
    } else {
      // Add to wishlist
      dispatch(addToWishlist({
        id: product.id,
        name: product.name,
        price: product.onSale ? product.salePrice : product.price,
        image: product.image,
      }));
    }
    
    // Also call the callback if provided
    onAddToWishlist?.(product, e);
  }, [isFavorite, product, dispatch, onAddToWishlist]);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    setIsAdded(true);
    onAddToCart(product, e);
    setTimeout(() => setIsAdded(false), 2000);
  }, [product, onAddToCart]);

  return (
    <div
      className={`group relative bg-[var(--color-accent)] rounded-lg shadow-sm hover:shadow-lg transition p-4 snap-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] ${cardWidthClass}`}
      onClick={() => onQuickView(product)}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
        {onSale && (
          <span className="bg-[var(--color-secondary)] text-white text-[10px] uppercase px-2 py-0.5 rounded font-bold">
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
        className={`absolute top-2 right-2 transition-all duration-200 hover:scale-105 z-20 p-1 bg-white/50 rounded-full cursor-pointer ${
          isFavorite
            ? 'text-red-500 fill-red-500'
            : 'text-[#000000] hover:text-[var(--color-secondary)]'
        }`}
        onClick={handleWishlistClick}
        aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
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
        <span className="text-xl font-semibold text-[var(--color-secondary)]">
          ${Number(displayPrice).toFixed(2)}
        </span>
        {onSale && (
          <span className="line-through text-gray-500 text-sm">${Number(price).toFixed(2)}</span>
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
          onClick={handleAddToCart}
          className={`flex-1 py-2 rounded flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer font-medium ${
            isAdded
              ? 'bg-[#0a6d1f] text-white hover:bg-[#0a6d1f]'
              : 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] hover:scale-105 transform'
          }`}
        >
          <FiShoppingCart /> {isAdded ? 'Added! ✓' : 'Add'}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="bg-white text-[#000000] border border-gray-200 py-2 px-3 rounded hover:bg-gray-100 hover:scale-105 transition-transform duration-200 cursor-pointer"
          aria-label="Quick view"
        >
          <FiEye />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;