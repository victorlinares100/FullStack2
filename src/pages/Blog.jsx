// src/pages/Blog.jsx
import React, { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import Text from "../components/atoms/Text"; // 

function Blog() {
  const [showInvierno, setShowInvierno] = useState(false);
  const [showDeporte, setShowDeporte] = useState(false);

  const handleCloseInvierno = () => setShowInvierno(false);
  const handleShowInvierno = () => setShowInvierno(true);

  const handleCloseDeporte = () => setShowDeporte(false);
  const handleShowDeporte = () => setShowDeporte(true);

  return (
    <>
      <Container className="mt-4 mb-5">
        <Text variant="h2" className="text-center mt-4">
          ¡Próximos Productos!
        </Text>

        {/* Producto Invierno */}
        <Row className="align-items-center mt-5">
          <Col md={6}>
            <img
              src="https://ae01.alicdn.com/kf/Sda38867f5ff54201a7b366a287ec7e772/2024-Mens-Winter-Ultralight-Down-Jacket-Lightweight-Luxury-Designer-Clothing-Winter-Thick-Coat-Heated-Jacket-Winter.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"
              alt="Ropa de invierno"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={6}>
            <Text variant="p" className="lead">
              Descubre las nuevas ofertas para la temporada de invierno.
            </Text>
            <Text variant="p">
              Nuestra colección de invierno incluye chaquetas, abrigos y bufandas de las mejores marcas.
              Calidad, comodidad y estilo a precios únicos. ¡No dejes pasar esta oportunidad para renovar tu armario!
            </Text>
            <Button variant="primary" onClick={handleShowInvierno}>
              Ver oferta
            </Button>
          </Col>
        </Row>

        {/* Producto Deportivo */}
        <Row className="align-items-center mt-5">
          <Col md={6}>
            <img
              src="https://media.istockphoto.com/id/466367844/es/foto/ropa-que-correr.jpg?s=612x612&w=0&k=20&c=oUoFqsmXWWJknxKZ16Ai_j7JfEgj9o7RBxA9B6tvK-k="
              alt="Ropa deportiva"
              className="img-fluid rounded"
            />
          </Col>
          <Col md={6}>
            <Text variant="p" className="lead">
              Observa todos los nuevos descuentos que tenemos para el área deportiva!!!
            </Text>
            <Text variant="p">
              Desde conjuntos deportivos hasta calzado de alto rendimiento, tenemos todo lo que necesitas para mantenerte activo y con estilo.
              Ideal para gimnasio, running o yoga. ¡Equipamiento de calidad a un solo clic!
            </Text>
            <Button variant="primary" onClick={handleShowDeporte}>
              Ver oferta
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Modal Invierno */}
      <Modal show={showInvierno} onHide={handleCloseInvierno} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Oferta de Invierno</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src="https://cdn.pixabay.com/photo/2017/02/20/18/03/winter-2080072_1280.jpg"
            alt="Ropa de invierno ampliada"
            className="img-fluid rounded mb-3"
          />
          <Text variant="p">
            ¡Aprovecha nuestros descuentos especiales en ropa de invierno de marca original! Disponible por tiempo limitado.
          </Text>
        </Modal.Body>
      </Modal>

      {/* Modal Deporte */}
      <Modal show={showDeporte} onHide={handleCloseDeporte} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Oferta Deportiva</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src="https://cdn.pixabay.com/photo/2016/03/27/19/44/sport-1284656_1280.jpg"
            alt="Ropa deportiva detalle"
            className="img-fluid rounded mb-3"
          />
          <Text variant="p">
            ¡Descubre nuestra línea deportiva con hasta 40% de descuento! Prendas ligeras, resistentes y diseñadas para mejorar tu rendimiento.
          </Text>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default Blog;
