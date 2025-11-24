import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Text from '../components/atoms/Text';
import productoService from '../services/productoService';
import { addProductToCart } from "../data/cart";

function Products() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productoService.getAll();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleAddToCart = (producto) => {
    addProductToCart({
      id: producto.id,
      name: producto.nombreProducto,
      price: producto.precioProducto,
      quantity: 1
    });

    setAddedId(producto.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <p>Cargando productos...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Text variant="h2" className="text-center mb-4">
        Productos
      </Text>
      <Row className="justify-content-center">
        {productos.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100">
              <div
                style={{
                  width: '100%',
                  height: 200,
                  overflow: 'hidden',
                  borderTopLeftRadius: '0.25rem',
                  borderTopRightRadius: '0.25rem',
                }}
              >
                {p.imagen?.url ? (
                  <Card.Img
                    variant="top"
                    src={p.imagen.url}
                    alt={p.nombreProducto}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#555',
                    }}
                  >
                    Sin imagen
                  </div>
                )}
              </div>

              <Card.Body className="d-flex flex-column">
                <Card.Title>{p.nombreProducto}</Card.Title>
                <Card.Text className="mb-1">Precio: ${p.precioProducto}</Card.Text>
                <Card.Text className="mb-1">Stock: {p.stock}</Card.Text>
                <Card.Text className="mb-1">
                  Categoría: {p.categoria?.tipoCategoria}
                </Card.Text>
                <Card.Text className="mb-1">
                  Marca: {p.marca?.nombreMarca}
                </Card.Text>
                <Card.Text className="mb-1">
                  Talla: {p.talla?.tipoTalla}
                </Card.Text>

                <Button
                  variant="primary"
                  className="mt-auto"
                  onClick={() => handleAddToCart(p)}
                >
                  Comprar
                </Button>
                {addedId === p.id && (
                  <div className="text-success text-center mt-2 fw-bold">
                    ¡Agregado!
                  </div>
                )}
              </Card.Body>

            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
