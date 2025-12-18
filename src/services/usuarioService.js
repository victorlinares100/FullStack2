import api from './api';

const registrar = async (datosUsuario) => {
    // Cambiado de 'api/v1/auth/registro' a 'api/v1/usuarios'
    const response = await api.post('api/v1/usuarios', datosUsuario);
    return response.data;
};

const login = async (credenciales) => {
    const response = await api.post('api/v1/auth/login', credenciales); // Cambiado de usuarios/login a auth/login
    return response.data;
}
const usuarioService = { registrar, login };
export default usuarioService;