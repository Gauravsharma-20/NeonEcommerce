import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id,
      );
      if (itemIndex >= 0) {
        const existingItem = state.items[itemIndex];
        if (existingItem) {
          existingItem.quantity += action.payload.quantity || 1;
        }
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.product.id === action.payload,
      );
      if (itemIndex >= 0) {
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectTotalItems = (state) =>
  state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0); // Safeguard here

export default cartSlice.reducer;