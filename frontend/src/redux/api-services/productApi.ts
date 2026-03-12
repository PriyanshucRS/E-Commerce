import { apiClient } from "./axiosInstance";
import { API_URL } from "../constants/api";

export const addProductApi = async (productData: any) => {
  const res = await apiClient.post(API_URL.PRODUCTS, productData);
  return res.data;
};

export const fetchMyProductsApi = async () => {
  const res = await apiClient.get(`${API_URL.PRODUCTS}/my-products`);
  return res.data;
};

export const fetchProductsApi = async () => {
  const res = await apiClient.get(API_URL.PRODUCTS);
  return res.data;
};

export const deleteProductApi = async (id: string) => {
  const res = await apiClient.delete(`${API_URL.PRODUCTS}/${id}`);
  return res.data;
};
