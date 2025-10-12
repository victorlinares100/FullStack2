// src/pages/Carrito.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Container, Table } from 'react-bootstrap';
import { getCartItems, removeProductFromCart, calculateTotal,clearAllCart }   
from '../data/cart'; 
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import Mensaje from '../components/atoms/mensaje';

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
  

  return (
    <Container className="py-5">
      <Text variant="h2">🛒 Tu Carrito</Text>
      <hr />
      
      {mensaje && (
        <Mensaje
          variant={mensaje.tipo}
          text={mensaje.texto}
          onClose={() => setMensaje(null)}
        />
      )}

      {cartItems.length === 0 ? (
        <Mensaje variant="info" text="Tu carrito de compras está vacío." />
      ) : (
        <>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toLocaleString()}</td>
                  <td>${(item.price * item.quantity).toLocaleString()}</td>
                  <td>
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

          <div className="d-flex justify-content-end align-items-center mt-4">
            <Text variant="h4" className="mr-3 text-right" style={{ marginRight: '1rem' }}>
              Total: **${formattedTotal}**
            </Text>
            <Button variant="warning" onClick={handleClearCart}>
                Vaciar Carrito
            </Button>
          </div>
          
          <div className="mt-4 text-right">
              <Button variant="success" size="lg" style={{ width: '100%' }}>
                  Proceder al Pago
              </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;