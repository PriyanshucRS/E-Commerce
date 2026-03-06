import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type{Product ,ProductState} from "../../types/product.types"


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
  },
});

export const {
    fetchProductRequest,
    fetchProductSuccess,
    fetchProductFailure
} = productSlice.actions

export default productSlice.reducer