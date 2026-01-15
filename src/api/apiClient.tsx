import axios from "axios";
import { API_URL } from "../config/config";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Automatically kick user to login if session expires
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
