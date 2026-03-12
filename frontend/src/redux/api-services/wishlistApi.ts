import { apiClient } from "./axiosInstance";
import { API_URL } from "../constants/api";

export const toggleWatchlistApi = async (productId: string) => {
  const res = await apiClient.post(API_URL.WATCHLIST, { productId });
  return res.data;
};

export const fetchWatchlistApi = async () => {
  const res = await apiClient.get("/watchlist");
  return res.data;
};
