import React, { useState, useEffect } from 'react';
import { Container, Carousel, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import productoService from '../services/productoService';
import carruselPhoto from '../assets/img/carrusel_photo.webp';

function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CARGA DE DATOS REALES (DB)
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

  // Filtramos solo los primeros 6 para la sección de populares
  const popularProducts = productos.slice(0, 6);

  const carouselItems = [
    {
      id: 1,
      src: carruselPhoto,
      alt: 'PRIMER SLIDE',
      title: 'Nueva Colección',
      description: 'Descubre las últimas tendencias 2025.',
      buttonText: 'Ver tendencias',
      link: '/products'
    },
  ];

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p>Cargando catálogo...</p>
      </Container>
    );
  }

  return (
    <>
      <Container className="py-4">

        {/* SECCIÓN DE BIENVENIDA */}
        <header className="text-center mt-5 mb-5">
          <h1 className="display-3 fw-bold" style={{ color: '#2c3e50' }}>
            Bienvenidos a Áurea
          </h1>
          <p className="lead text-muted">
            Encuentra la mejor calidad y tendencia en un solo lugar.
          </p>
          <div
            className="mx-auto"
            style={{
              width: '80px',
              height: '4px',
              backgroundColor: '#007bff',
              borderRadius: '2px',
              marginTop: '10px'
            }}
          ></div>
        </header>

        <section>
          {/* CARRUSEL */}
          <div className="section-spacing mb-5">
            <Carousel className="carousel-limit-height" interval={3000} fade>
              {carouselItems.map(item => (
                <Carousel.Item key={item.id}>
                  <img
                    className="d-block w-100"
                    src={item.src}
                    alt={item.alt}
                  />
                  <Carousel.Caption className="carousel-caption-custom">
                    <h3 className="display-4 fw-bold">{item.title}</h3>
                    <p className="lead">{item.description}</p>
                    <Button variant="light" size="lg" as={Link} to={item.link}>
                      {item.buttonText}
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* TÍTULO SECCIÓN PRODUCTOS */}
          <div className="text-center">
            <h2 className="titulo-seccion my-4">MÁS POPULARES</h2>
          </div>

          {/* LISTA DE PRODUCTOS (Desde Base de Datos) */}
          <Row>
            {popularProducts.map((p) => (
              <Col sm={12} md={6} lg={4} key={p.id} className="mb-5 d-flex">
                <Card className="product-card-modern h-100 w-100">

                  {/* Imagen + Badge */}
                  <div className="card-img-wrapper">
                    {p.imagen?.url ? (
                      <img
                        src={p.imagen.url}
                        alt={p.nombreProducto}
                        className="card-img-custom"
                      />
                    ) : (
                      <div className="d-flex w-100 h-100 align-items-center justify-content-center bg-light text-muted">
                        Sin imagen
                      </div>
                    )}

                    {/* Badge si hay poco stock */}
                    {p.stock > 0 && p.stock < 5 && (
                      <span className="badge-stock">¡Últimas unidades!</span>
                    )}
                  </div>

                  {/* Cuerpo de la tarjeta */}
                  <Card.Body className="d-flex flex-column p-4">
                    <div className="mb-2">
                      <small className="text-muted text-uppercase fw-bold">
                        {p.categoria?.tipoCategoria || 'General'}
                      </small>
                    </div>

                    <Card.Title className="card-title-custom">
                      {p.nombreProducto}
                    </Card.Title>

                    <div className="d-flex justify-content-between align-items-center mt-2 mb-4">
                      <span className="card-price">
                        ${p.precioProducto?.toLocaleString()}
                      </span>
                      {p.marca?.nombreMarca && (
                        <span className="text-muted small border px-2 py-1 rounded">
                          {p.marca.nombreMarca}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Link to="/products">
                        <Button className="btn-modern">
                          Ver Detalles
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>
    </>
  );
}

export default Home;