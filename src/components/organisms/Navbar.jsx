import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/aurea_logo_sin.webp';

function NavBar() {
  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16" style={{ color: '#C5A25D' }}>
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4 1 1 1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
    </svg>
  );

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            width="70"
            height="70"
            className="d-inline-block me-2"
            alt="Áurea Logo"
            style={{ marginTop: '-15px', marginBottom: '-15px' }}
          />
          Áurea
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between w-100">
          <Nav>
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            <Nav.Link as={Link} to="/Nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/Contacto">Contactanos</Nav.Link>
            <Nav.Link as={Link} to="/Blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/Carrito">Carrito</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title={UserIcon} id="user-nav-dropdown" align="end" className="no-caret">
              <NavDropdown.Item as={Link} to="/login">Iniciar Sesión</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/registro">Registrarse</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
