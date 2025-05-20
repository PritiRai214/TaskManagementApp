// src/services/Api.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000/api' });
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token && !req.url.includes('/auth/')) {  // skip /auth routes, good
    req.headers.Authorization = `Bearer ${token}`; // <-- header key should be 'Authorization'
  }
  return req;
});

export default API;
