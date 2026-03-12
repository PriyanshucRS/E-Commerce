import { apiClient } from "./axiosInstance";
import { API_URL } from "../constants/api";

export const addToCartApi = async (product: any) => {
  try {
    const res = await apiClient.post(API_URL.ADDCART, {
      productId: product._id,
      quantity: 1,
    });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to add to cart");
  }
};

export const fetchCartApi = async () => {
  try {
    const response = await apiClient.get("/cart");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch cart");
  }
};

export const deleteCartApi = async (productId: string) => {
  try {
    const res = await apiClient.delete(`/cart/remove/${productId}`);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to remove item");
  }
};

export const updateCartQuantityApi = async (
  productId: string,
  quantity: number,
) => {
  try {
    const res = await apiClient.post("/cart/update", { productId, quantity });
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to update quantity");
  }
};
