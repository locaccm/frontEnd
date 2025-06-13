// src/services/adminApi.ts
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_ADMIN_API_BASE_URL,
  });

export default api;
