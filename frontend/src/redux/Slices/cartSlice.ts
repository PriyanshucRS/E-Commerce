import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product.types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartRequest: (state) => {
      state.loading = true;
    },

    fetchCartSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action.payload && action.payload.items) {
        state.items = action.payload.items.map((i: any) => ({
          ...i.productId,
          quantity: i.quantity,
        }));
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    fetchCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addToCartRequest: (state, action: PayloadAction<Product>) => {
      state.loading = true;
    },
     addToCartSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action.payload && action.payload.items) {
        state.items = action.payload.items.map((i: any) => ({
          ...i.productId,
          quantity: i.quantity,
        }));
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    addToCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

   

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: any) => item._id !== action.payload,
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item: any) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item: any) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
  },
});

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  fetchCartRequest,
  fetchCartSuccess,
  fetchCartFailure,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
