import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreProduct, WishlistState } from '../../types';

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('wishlistItems') ?? '[]') as StoreProduct[],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<StoreProduct>) => {
      const index = state.items.findIndex(i => i.id === action.payload.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem('wishlistItems', JSON.stringify(state.items));
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
