import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.1.11:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auto attach token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

// Products
export const getProducts = () => api.get("/products");

// Cart
export const getCart = () => api.get("/cart");
export const addToCart = (productId, quantity) =>
  api.post("/cart/add", { productId, quantity });
export const updateCart = (productId, quantity) =>
  api.patch("/cart/update", { productId, quantity });
export const removeFromCart = (productId) =>
  api.delete(`/cart/remove/${productId}`);
export const clearCart = () => api.delete("/cart/clear");

export default api;
