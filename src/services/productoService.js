import api from './api';

// Manejo de errores genérico
const handleError = (error) => {
    console.error("API Error:", error.response?.status, error.response?.data || error.message);
    throw error;
};

// Productos
const getAll = async () => {
    try {
        const response = await api.get('/api/v1/productos');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getById = async (id) => {
    try {
        const response = await api.get(`/api/v1/productos/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const create = async (data) => {
    try {
        const dto = {
            nombreProducto: data.nombre || data.nombreProducto,
            precioProducto: parseFloat(data.precio),
            stock: parseInt(data.stock),
            categoriaId: data.categoria || null,
            marcaId: data.marca || null,
            tallaId: data.talla || null,
            imagenUrl: data.imagen || null,
        };
        const response = await api.post('/api/v1/productos', dto);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const update = async (id, data) => {
    try {
        const dto = {
            nombreProducto: data.nombre || data.nombreProducto,
            precioProducto: parseFloat(data.precio),
            stock: parseInt(data.stock),
            categoriaId: data.categoria || null,
            marcaId: data.marca || null,
            tallaId: data.talla || null,
            imagenUrl: data.imagen || null,
        };
        const response = await api.put(`/api/v1/productos/${id}`, dto);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const remove = async (id) => {
    try {
        await api.delete(`/api/v1/productos/${id}`);
    } catch (error) {
        handleError(error);
    }
};

// Funciones para selects
const getCategorias = async () => {
    try {
        const response = await api.get('/api/v1/categorias');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getMarcas = async () => {
    try {
        const response = await api.get('/api/v1/marcas');
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

const getTallas = async () => {
    try {
        const response = await api.get('/api/v1/tallas');
        return response.data;
    } catch (error) {
        handleError(error);
    }
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
