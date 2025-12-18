import axios from 'axios';

//Archivo que crea una instancia de axios con la URL base de la API
//Así si se modifica el url, solo se cambia en este archivo y no en todos los archivos donde se use axios

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Buscamos el token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Lo añadimos al estilo Bearer
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;