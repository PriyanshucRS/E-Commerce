import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product.types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  loading: boolean;
  error: string | null;
}

const calculateTotalPrice = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    fetchCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchCartSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      const responseData = action.payload.data || action.payload;
      state.totalPrice =
        action.payload.totalPrice ?? calculateTotalPrice(state.items);
      const newItems =
        responseData.items || (Array.isArray(responseData) ? responseData : []);

      state.items = newItems;
      state.totalPrice = calculateTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    fetchCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addToCartRequest: (state, action: PayloadAction<Product>) => {
      state.loading = true;
      state.error = null;
    },

    addToCartSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      const data = action.payload.data || action.payload;
      state.totalPrice =
        action.payload.totalPrice ?? calculateTotalPrice(state.items);
      state.items = data.items || (Array.isArray(data) ? data : state.items);
      state.totalPrice = calculateTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    addToCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    removeFromCartRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    removeFromCartSuccess: (state, action: PayloadAction<any>) => {
      state.error = null;
      state.loading = false;
      const data = action.payload.data || action.payload;
      
      state.items =
        data.items ||
        data.cart?.items ||
        (Array.isArray(data) ? data : state.items);
      state.totalPrice =
        action.payload.totalPrice ?? calculateTotalPrice(state.items);
       
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateCartQuantityRequest: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      state.loading = true;
      state.error = null;
      const targetId = action.payload.id;
      const nextItems = state.items.map((item) => {
        const itemId = item.productId || item._id || item.id;
        if (itemId === targetId) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      state.items = nextItems;
      state.totalPrice = calculateTotalPrice(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    updateCartQuantityFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      localStorage.removeItem("cart");
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
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFailure,
  updateCartQuantityRequest,
  updateCartQuantityFailure,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
