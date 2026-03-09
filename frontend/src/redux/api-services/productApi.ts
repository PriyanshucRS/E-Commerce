import axios from "axios";
import { API_URL } from "../constants/api";




const api = axios.create({ baseURL: "http://localhost:5000/api" });

export const addProductApi = async(productData : any) =>{
    const res = await api.post(API_URL.PRODUCTS, productData);
    return res.data
}

export const fetchProductsApi  = async() =>{
    const res = await api.get(API_URL.PRODUCTS);
    return res.data
}

