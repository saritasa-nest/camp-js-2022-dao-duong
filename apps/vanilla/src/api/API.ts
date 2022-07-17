import axios from 'axios';
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: { 'Api-Key': import.meta.env.VITE_API_KEY, 'Accept': 'application/json' },
});
