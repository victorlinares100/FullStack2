// src/pages/Carrito.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getCartItems, removeProductFromCart, calculateTotal, clearAllCart } from '../data/cart';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import Mensaje from '../components/atoms/Mensaje';
import carritoService from '../services/carritoService';

function Carrito() {
  const [cartItems, setCartItems] = useState([]);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const total = useMemo(() => calculateTotal(cartItems), [cartItems]);
  const formattedTotal = total.toLocaleString();

  const handleRemove = (productId) => {
    const updatedItems = removeProductFromCart(productId);
    setCartItems(updatedItems);
    setMensaje({ tipo: "warning", texto: "Producto eliminado del carrito." });
  };

  const handleClearCart = () => {
    const updatedItems = clearAllCart();
    setCartItems(updatedItems);
    setMensaje({ tipo: "info", texto: "El carrito ha sido vaciado." });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setMensaje({ tipo: "warning", texto: "El carrito está vacío." });
      return;
    }

    try {
      const userId = 1; // Sustituir por ID real de sesión luego
      await carritoService.guardarCarrito(cartItems, userId);

      clearAllCart();
      setCartItems([]);
      setMensaje({ tipo: "success", texto: "¡Compra realizada con éxito!" });

    } catch (error) {
      console.error(error);
      setMensaje({ tipo: "danger", texto: "Error al procesar la compra." });
    }
  };

  return (
    <Container className="py-5" style={{ minHeight: '70vh' }}>
      {/* Título y Mensajes de alerta */}
      <div className="mb-4">
        <Text variant="h2">🛒 Mi Carrito</Text>
        <hr />
        {mensaje && (
          <Mensaje
            variant={mensaje.tipo}
            text={mensaje.texto}
            onClose={() => setMensaje(null)}
          />
        )}
      </div>

      {/* RENDERIZACIÓN CONDICIONAL */}
      {cartItems.length === 0 ? (
        /* --- ESTADO VACÍO (CENTRADO Y GRANDE) --- */
        <Row className="justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
          <Col md={8} className="text-center">
            <div className="mb-4">
              <span style={{ fontSize: '100px', filter: 'grayscale(1)' }}>🛒</span>
            </div>
            <h1 className="display-3 fw-bold mb-3" style={{ color: '#2c3e50' }}>
              Tu carrito está vacío
            </h1>
            <p className="lead text-muted mb-4">
              Parece que aún no has elegido nada. Explora nuestros productos y encuentra algo increíble para ti.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg" className="px-5">
                Ir a la Tienda
              </Button>
            </Link>
          </Col>
        </Row>
      ) : (
        /* --- ESTADO CON PRODUCTOS --- */
        <>
          <Table striped bordered hover className="mt-3 shadow-sm">
            <thead className="bg-light">
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th className="text-center">Acción</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td className="align-middle fw-bold">{item.name}</td>
                  <td className="align-middle">{item.quantity}</td>
                  <td className="align-middle">${item.price.toLocaleString()}</td>
                  <td className="align-middle">${(item.price * item.quantity).toLocaleString()}</td>
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-between align-items-center mt-5 p-4 bg-light rounded shadow-sm">
            <Button variant="outline-secondary" onClick={handleClearCart}>
              Vaciar Carrito
            </Button>
            <div className="text-end">
              <Text variant="h3" className="mb-0">
                Total a Pagar: <span className="text-primary">${formattedTotal}</span>
              </Text>
            </div>
          </div>

          <div className="mt-4">
            <Button
              variant="success"
              size="lg"
              className="w-100 py-3 fw-bold shadow"
              onClick={handleCheckout}
            >
              PROCEDER AL PAGO
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;