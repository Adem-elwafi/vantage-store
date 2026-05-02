import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';
import { removeFromWishlist } from '../features/wishlist/wishlistSlice';
import { addItemToCart } from '../features/cart/cartSlice';

const Wishlist = () => {
  const dispatch = useDispatch();
  
  // Get wishlist items from Redux store
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const handleRemoveItem = useCallback((itemId) => {
    dispatch(removeFromWishlist(itemId));
  }, [dispatch]);

  const handleAddToCart = useCallback((item) => {
    dispatch(addItemToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    }));
    // Optionally remove from wishlist after adding to cart
    // dispatch(removeFromWishlist(item.id));
  }, [dispatch]);

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-gray-600 mb-6">Your wishlist is empty</p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-[#253900] text-white rounded-lg hover:bg-[#08CB00] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}</p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors z-10 cursor-pointer"
                  aria-label="Remove from wishlist"
                >
                  <FiTrash2 className="w-5 h-5" />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{item.name}</h3>
                <p className="text-lg font-bold text-[#08CB00] mb-4">${item.price?.toFixed(2)}</p>

                {/* Actions */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full flex items-center justify-center gap-2 bg-[#253900] text-white py-2 rounded-lg hover:bg-[#08CB00] hover:scale-105 transition-all duration-200 mt-auto cursor-pointer font-medium"
                >
                  <FiShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-semibold cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
