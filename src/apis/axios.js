import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = JSON.parse(localStorage.getItem('token'));

      if (token) {
        config.headers.Authorization = `Bearer token`;
      }

      return config;
    } catch (error) {
      console.error('Token Parse Error:', error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle Unauthorized
      // localStorage.clear();
      // window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      // Handle Forbidden
    }

    if (error.code === 'ECONNABORTED') {
      console.error('Request Timeout');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;