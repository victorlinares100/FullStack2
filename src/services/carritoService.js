import api from "./api";

const guardarCarrito = async (items, usuarioId, metodoPagoId = 1, estadoId = 1) => {
    const payload = {
        usuarioId: usuarioId,  
        metodoPagoId: metodoPagoId,
        estadoId: estadoId,
        items: items.map(i => ({
            productoId: i.id,
            cantidad: i.quantity,
            precioUnitario: i.price
        }))
    };

    console.log("PAGO ENVIADO:", payload);

    const resp = await api.post("/api/v1/comprobantes/carrito", payload);
    return resp.data;
};

export default {
    guardarCarrito
};
