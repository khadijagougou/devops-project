import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ProductState, StoreProduct, ProductFilters } from '../../types';

export const fetchProducts = createAsyncThunk<StoreProduct[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<StoreProduct[]>('https://fakestoreapi.com/products');
      return data;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return rejectWithValue(message);
    }
  }
);

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  filters: { category: 'all', search: '', sort: 'default' },
};

const applyFilters = (items: StoreProduct[], filters: ProductFilters): StoreProduct[] => {
  let result = items.filter(item => {
    const matchCat  = filters.category === 'all' || item.category === filters.category;
    const matchSrch = item.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchCat && matchSrch;
  });
  if (filters.sort === 'price-low-high')  result = [...result].sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-high-low')  result = [...result].sort((a, b) => b.price - a.price);
  return result;
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Error';
      });
  },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
