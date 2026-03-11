import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    toggleWatchlistRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchWatchlistRequest: (state) => {
      state.loading = true;
    },
    fetchWatchlistSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.items = action.payload.items || action.payload;
    },
    fetchWatchlistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearWatchList: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  clearWatchList,
  toggleWatchlistRequest,
  fetchWatchlistRequest,
  fetchWatchlistSuccess,
  fetchWatchlistFailure,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;
