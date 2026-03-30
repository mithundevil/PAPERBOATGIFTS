import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  withCredentials: true,
});

// Add interceptor for auth token
api.interceptors.request.use((config) => {
  const userInfo = typeof window !== 'undefined' ? localStorage.getItem('userInfo') : null;
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
