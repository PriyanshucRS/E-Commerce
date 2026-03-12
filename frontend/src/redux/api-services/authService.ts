import axios from "axios";
import { API_URL } from "../constants/api";

const AUTH_API_URL = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const regApi = async (userData: any) => {
  const res = await AUTH_API_URL.post(API_URL.Register, userData);
  return res.data;
};

export const loginApi = async (credential: any) => {
  const res = await AUTH_API_URL.post(API_URL.LOGIN, credential);
  return res.data;
};

