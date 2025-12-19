// src/components/organisms/Footer.jsx
import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../assets/img/aurea_logo_con.webp"; //
import "../../styles/footer.css"; //

function Footer() {
  return (
    <footer className="footer-large">
      <Container>
        <Row className="align-items-center py-5">
          {/* Lado Izquierdo: Marca y Eslogan */}
          <Col md={4} className="text-center text-md-start mb-4 mb-md-0">
            <img src={logo} alt="Aurea Logo" className="footer-logo-large" />
            <p className="footer-description mt-3">
              Redefiniendo el estilo y la calidad en cada detalle. Tu tienda de confianza.
            </p>
          </Col>

          {/* Centro: Navegación Principal */}
          <Col md={4} className="text-center mb-4 mb-md-0">
            <h5 className="footer-title">Explora</h5>
            <Nav className="flex-column footer-links-large">
              <Link to="/">Inicio</Link>
              <Link to="/Products">Productos</Link>
              <Link to="/Nosotros">Sobre Nosotros</Link>
              <Link to="/Contacto">Contacto</Link>
            </Nav>
          </Col>

          {/* Lado Derecho: Info de Contacto */}
          <Col md={4} className="text-center text-md-end">
            <h5 className="footer-title">Contacto</h5>
            <div className="footer-contact-info">
              <p>Santiago, Chile</p>
              <p>contacto@aurea.cl</p>
              <p className="fw-bold">+56 9 1234 5678</p>
            </div>
          </Col>
        </Row>

        <div className="footer-bottom-wide">
          <p className="mb-0">© {new Date().getFullYear()} AUREA CHILE - Todos los derechos reservados</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;