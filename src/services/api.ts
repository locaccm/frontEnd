// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000', // URL de ton backend
});

export default api;
