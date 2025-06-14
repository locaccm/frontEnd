// src/core/apiExample.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // adapter selon ton back
});

export default api;
