import Login from '../pages/Login';
import api from './api';

// Función para registrar un nuevo usuario
const registrar = async (datosUsuario) => {
    const response = await api.post('api/v1/auth/registro', datosUsuario);
    // Retornamos solo los datos de la respuesta (el mensaje de éxito)
    return response.data;
};

// Función para iniciar sesión
const login = async (credenciales) => {
    const response = await api.post('api/v1/auth/login', credenciales);
    
    if (response.data){
        localStorage.setItem("usuarioLogueado", JSON.stringify(response.data.usuario));
    }
    return response.data;
}

// Función para cerrar sesión
const logout = () => {
    localStorage.removeItem("usuarioLogueado");
}

const usuarioService = {
    registrar,
    login,
    logout
};

export default usuarioService;