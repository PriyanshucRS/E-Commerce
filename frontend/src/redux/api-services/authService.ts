import axios from "axios";
import { API_URL } from "../constants/api";


const BASE_URL = "http://localhost:5000/api/auth";

const Auth_API_URL = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const regApi = async (userData: any) => {
 
    const res = await Auth_API_URL.post(API_URL.Register, userData);
    return res.data;
};

export const loginApi = async (credential: any) => {
  const res = await Auth_API_URL.post(API_URL.LOGIN, credential);
    return res.data;

};
