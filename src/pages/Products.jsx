import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import productoService from '../services/productoService';
import { addProductToCart } from "../data/cart";

function Products() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el buscador
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  // 1. Cargar productos
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

  // 2. Lógica del Buscador (Filtra por nombre, marca o categoría)
  const filteredProducts = productos.filter((p) => {
    const term = searchTerm.toLowerCase();
    const nombre = p.nombreProducto?.toLowerCase() || "";
    const marca = p.marca?.nombreMarca?.toLowerCase() || "";
    const categoria = p.categoria?.tipoCategoria?.toLowerCase() || "";

    return nombre.includes(term) || marca.includes(term) || categoria.includes(term);
  });

  // 3. Agregar al carrito
  const handleAddToCart = (producto) => {
    addProductToCart({
      id: producto.id,
      name: producto.nombreProducto,
      price: producto.precioProducto,
      quantity: 1
    });

    setAddedId(producto.id);
    setTimeout(() => setAddedId(null), 2000); // Resetear mensaje a los 2 seg
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      
      {/* --- ENCABEZADO Y BUSCADOR --- */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
        <div>
           <h2 className="fw-bold m-0" style={{ color: '#1e293b' }}>Nuestros Productos</h2>
           <p className="text-muted m-0">Explora lo mejor de nuestro catálogo</p>
        </div>

        <div className="w-100 w-md-50" style={{ maxWidth: '400px' }}>
            <InputGroup className="search-input-group">
                <InputGroup.Text className="bg-white border-end-0">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </InputGroup.Text>
                <Form.Control
                    placeholder="Buscar producto, marca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0 ps-0 shadow-none"
                    style={{ fontSize: '0.95rem' }}
                />
            </InputGroup>
        </div>
      </div>

      {/* --- GRID DE PRODUCTOS --- */}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <Col key={p.id} xs={12} sm={6} md={4} lg={3} className="mb-4 d-flex">
              <Card className="product-card-modern h-100 w-100 border-0">
                
                {/* Imagen */}
                <div className="card-img-wrapper">
                  {p.imagen?.url ? (
                    <Card.Img
                      variant="top"
                      src={p.imagen.url}
                      alt={p.nombreProducto}
                      className="card-img-custom"
                    />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                      Sin imagen
                    </div>
                  )}
                  {/* Etiqueta de Categoría Flotante */}
                  {p.categoria?.tipoCategoria && (
                      <span className="category-badge">
                          {p.categoria.tipoCategoria}
                      </span>
                  )}
                </div>

                {/* Cuerpo */}
                <Card.Body className="d-flex flex-column p-4">
                  <div className="mb-2">
                    <small className="text-muted text-uppercase fw-bold" style={{fontSize: '0.7rem'}}>
                        {p.marca?.nombreMarca || 'Genérico'}
                    </small>
                  </div>

                  <Card.Title className="fw-bold mb-3 text-dark" style={{ fontSize: '1rem' }}>
                    {p.nombreProducto}
                  </Card.Title>

                  {/* Precio y Stock */}
                  <div className="d-flex justify-content-between align-items-end mt-auto mb-3">
                     <span className="fs-5 fw-bolder text-primary">
                        ${p.precioProducto?.toLocaleString()}
                     </span>
                     <small className={`fw-semibold ${p.stock > 0 ? 'text-success' : 'text-danger'}`}>
                        {p.stock > 0 ? `${p.stock} disp.` : 'Agotado'}
                     </small>
                  </div>

                  {/* Botón de Compra */}
                  <Button
                    onClick={() => handleAddToCart(p)}
                    className={`w-100 py-2 fw-semibold transition-all ${
                        addedId === p.id ? 'btn-success-custom' : 'btn-primary-custom'
                    }`}
                    disabled={p.stock <= 0}
                  >
                    {addedId === p.id ? (
                        <span>
                            <i className="bi bi-check-lg me-2"></i>Agregado
                        </span>
                    ) : (
                        p.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
            <Col className="text-center py-5">
                <h4 className="text-muted">No encontramos productos con "{searchTerm}"</h4>
                <p className="text-muted">Intenta con otra palabra.</p>
            </Col>
        )}
      </Row>
    </Container>
  );
}

export default Products;