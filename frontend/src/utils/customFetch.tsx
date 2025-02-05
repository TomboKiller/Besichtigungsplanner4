import axios from 'axios';

export const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

const customFetch = axios.create({
  baseURL: apiBaseUrl + 'api/v1/',
});

export default customFetch;
