import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
      
      state.totalQuantity++;
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
      
      state.totalQuantity--;
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
    updateQuantity(state, action) {
      const { id, change } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (!existingItem) return;
      
      const newQuantity = existingItem.quantity + change;
      
      if (newQuantity < 1) return;
      
      existingItem.quantity = newQuantity;
      existingItem.totalPrice = existingItem.price * newQuantity;
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
