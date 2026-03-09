import axios from "axios";
import { API_URL } from "../constants/api";

const api = axios.create({ baseURL: "http://localhost:5000/api" });

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
 

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const addToCartApi = async (product: any) => {
  try {
    const res = await api.post(API_URL.ADDCART, {
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
    const response = await api.get("/cart");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch cart");
  }
};
