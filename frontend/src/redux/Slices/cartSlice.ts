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
  
  const responseData = action.payload.data || action.payload;
  const newItems = responseData.items || (Array.isArray(responseData) ? responseData : []);

  state.items = newItems;
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
      state.items = action.payload.items;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    addToCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    removeFromCartRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },

    removeFromCartSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;

      if (action.payload && action.payload.cart) {
        state.items = action.payload.cart.items;
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCartFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
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

    updateCartQuantityRequest: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      state.loading = true;
    },

updateCartQuantitySuccess: (state, action: PayloadAction<any>) => {
  state.loading = false;
  
  
  if (action.payload.data && Array.isArray(action.payload.data.items)) {
    state.items = action.payload.data.items;
    localStorage.setItem("cart", JSON.stringify(state.items));
  } else {
    console.error("Payload data is missing items array:", action.payload);
  }
},

    updateCartQuantityFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
   const newItems =   state.error = action.payload;
    if (Array.isArray(newItems)) {
    state.items = newItems;
    localStorage.setItem("cart", JSON.stringify(state.items));
  }
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
  incrementQuantity,
  decrementQuantity,
  updateCartQuantityRequest,
  updateCartQuantitySuccess,
  updateCartQuantityFailure,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
