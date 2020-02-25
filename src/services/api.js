import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_AWS_API_URL,
});

api.interceptors.request.use(
  config => {
    const token = localStorage[process.env.VUE_APP_TOKEN_NAME];

    if (token) {
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` },
      };
    }
    return config;
  },
  err => Promise.reject(err)
);

export default api;
