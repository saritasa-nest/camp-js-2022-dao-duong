import axios from 'axios';
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: { 'Api-Key': `${import.meta.env.VITE_API_KEY}`, 'Accept': 'application/json' },
});
