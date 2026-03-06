import axios from "axios";

export const productApi = axios.create({
    baseURL : "https://fakestoreapi.com",
    headers :{
        'Content-type': "application/json"
    },
});

productApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

       if(token) {
          config.headers.Authorization = `Bearer ${token}`
       }

       return config
})