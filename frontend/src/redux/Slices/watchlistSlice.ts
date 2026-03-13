import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    toggleWatchlistRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchWatchlistRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWatchlistSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload.items || action.payload;
    },
    fetchWatchlistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    toggleWatchlistSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload.items || state.items;
    },
    toggleWatchlistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearWatchList: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      localStorage.removeItem("watchlist");
    },
  },
});

export const {
  clearWatchList,
  toggleWatchlistRequest,
  toggleWatchlistSuccess,
  toggleWatchlistFailure,
  fetchWatchlistRequest,
  fetchWatchlistSuccess,
  fetchWatchlistFailure,
} = watchlistSlice.actions;
export default watchlistSlice.reducer;