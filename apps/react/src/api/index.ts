import axios, { AxiosInstance } from 'axios';

import { CONFIG } from './config';
import { tokenInterceptor } from './interceptor/tokenInterceptor';

export const http: AxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl,
  headers: {
    'Api-Key': CONFIG.apiKey,
  },
});

http.interceptors.request.use(config => tokenInterceptor(config),
  error => {
    Promise.reject(error);
});
