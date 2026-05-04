import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/',
});

// Ajouter automatiquement le token JWT dans chaque requête
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Gérer l'expiration du token (refresh automatique)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');
        const res = await axios.post('http://localhost:8000/token/refresh/', { refresh });
        localStorage.setItem('access_token', res.data.access);
        original.headers.Authorization = `Bearer ${res.data.access}`;
        return API(original);
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default API;   // ← cette ligne est obligatoire