import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.x.x:5000'; // this one here u change

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);

export const getProducts = () => api.get('/products');

ipconfigexport const getCart = () => api.get('/cart');
export const addToCart = (productId, quantity) => api.post('/cart/add', { productId, quantity });
export const updateCart = (productId, quantity) => api.patch('/cart/update', { productId, quantity });
export const removeFromCart = (productId) => api.delete(`/cart/remove/${productId}`);

export default api;