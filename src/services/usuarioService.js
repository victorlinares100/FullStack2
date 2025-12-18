import api from './api';

const registrar = async (datosUsuario) => {
    // Cambiado de 'api/v1/auth/registro' a 'api/v1/usuarios'
    const response = await api.post('api/v1/usuarios', datosUsuario);
    return response.data;
};

const login = async (credenciales) => {
    // CAMBIO IMPORTANTE: de 'auth/login' a 'usuarios/login'
    const response = await api.post('api/v1/usuarios/login', credenciales);

    // Al hacer este log, ahora deberías ver solo: { token, nombre, rol }
    console.log("Data desde el service:", response.data);

    return response.data;
}
const usuarioService = { registrar, login };
export default usuarioService;