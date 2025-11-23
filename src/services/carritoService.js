import api from "./api";

const guardarCarrito = async (items, userId, metodoPagoId = 1, estadoId = 1) => {
    const payload = {
        userId: userId,       
        metodoPagoId: metodoPagoId, 
        items: items.map(i => ({
            productoId: i.id,
            cantidad: i.quantity,
            precioUnitario: i.price
        }))
    };

    const resp = await api.post("/api/comprobantes/carrito", payload);
    return resp.data;
};

export default {
    guardarCarrito
};
