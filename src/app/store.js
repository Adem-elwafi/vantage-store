import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import wishlistReducer from '../features/wishlist/wishlistSlice';

// Load persisted state from localStorage
const loadPersistedState = () => {
  try {
    const persistedCart = localStorage.getItem('cart');
    const persistedWishlist = localStorage.getItem('wishlist');
    return {
      cart: persistedCart ? JSON.parse(persistedCart) : undefined,
      wishlist: persistedWishlist ? JSON.parse(persistedWishlist) : undefined,
    };
  } catch (error) {
    console.warn('Failed to load persisted state from localStorage:', error);
    return {};
  }
};

const persistedState = loadPersistedState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: persistedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  try {
    const state = store.getState();
    localStorage.setItem('cart', JSON.stringify(state.cart));
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
  } catch (error) {
    console.warn('Failed to persist state to localStorage:', error);
  }
});
