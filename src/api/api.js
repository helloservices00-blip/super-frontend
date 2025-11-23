import axios from "axios";

export const API_URL = "https://super-backend-bzin.onrender.com";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// For file uploads (if needed)
/*
export const uploadApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
*/
