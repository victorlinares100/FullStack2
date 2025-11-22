import api from './api';

// Productos
const getAll = async () => {
    const response = await api.get('/api/productos');
    return response.data;
};

const getById = async (id) => {
    const response = await api.get(`/api/productos/${id}`);
    return response.data;
};

const create = async (data) => {
    const response = await api.post('/api/productos', data);
    return response.data;
};

const update = async (id, data) => {
    const response = await api.put(`/api/productos/${id}`, data);
    return response.data;
};

const remove = async (id) => {
    await api.delete(`/api/productos/${id}`);
};

// 🔹 Nuevas funciones para selects
const getCategorias = async () => {
    const response = await api.get('/api/categorias');
    return response.data; // [{id, tipoCategoria}]
};

const getMarcas = async () => {
    const response = await api.get('/api/marcas');
    return response.data; // [{id, nombreMarca}]
};

const getTallas = async () => {
    const response = await api.get('/api/tallas');
    return response.data; // [{id, tipoTalla}]
};

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    getCategorias,
    getMarcas,
    getTallas
};
