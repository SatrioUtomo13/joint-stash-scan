import axios from 'axios';

const DEV_API_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: DEV_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // redirect
    }
    return Promise.reject(error);
  }
);

export default api;
