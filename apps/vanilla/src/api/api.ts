import axios from 'axios';

import { requestInterceptor } from './interceptor';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Api-Key': import.meta.env.VITE_API_KEY, 'Accept': 'application/json' },
});

api.interceptors.request.use(config => requestInterceptor(config),
  error => {
    Promise.reject(error);
});
