// src/api/axios.ts
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3000', // URL do backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configuração para incluir o token JWT no header de todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Armazenando o token no localStorage após o login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
