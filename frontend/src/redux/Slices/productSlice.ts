import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product, ProductState } from "../../types/product.types";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductRequest: (state) => {
      state.loading = true;
    },
    fetchProductSuccess: (state, action: PayloadAction<Product[]>) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addProductRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
    },
    addProductSuccess: (state, action: PayloadAction<Product>) => {
      state.loading = false;
      state.products.push(action.payload);
    },
    addProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.products = state.products.filter(p => (p._id || p.id) !== action.payload);
    },
    deleteProductFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
