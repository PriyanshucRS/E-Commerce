import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const getItemId = (item: any) => item.productId || item._id || item.id;

const normalizeItems = (items: any[]) => {
  const map = new Map<string, any>();
  items.forEach((item) => {
    const id = getItemId(item);
    if (!id) return;
    if (!map.has(id)) map.set(id, item);
  });
  return Array.from(map.values());
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    toggleWatchlistRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
      const payload = action.payload;
      const productId = getItemId(payload);
      if (productId && typeof payload === "object") {
        const exists = state.items.some(
          (item: any) => getItemId(item) === productId,
        );
        if (exists) {
          state.items = state.items.filter(
            (item: any) => getItemId(item) !== productId,
          );
        } else {
          state.items = normalizeItems([...state.items, payload]);
        }
      }
    },
    fetchWatchlistRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWatchlistSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      state.items = normalizeItems(action.payload.items || action.payload);
    },
    fetchWatchlistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    toggleWatchlistSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = null;
      const incoming = action.payload.items || state.items;
      state.items = normalizeItems(incoming);
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
