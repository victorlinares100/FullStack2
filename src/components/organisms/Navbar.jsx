import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/aurea_logo_sin.webp'; //
import { useUser } from '../../context/UserContext'; //

function NavBar() {
  const { user, logout } = useUser(); //
  const navigate = useNavigate(); //

  const handleLogout = () => {
    logout(); //
    navigate('/'); //
  };

  const UserIcon = (
    <div className="d-flex align-items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16" style={{ color: '#C5A25D' }}>
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
      </svg>
      {user && (
        <span
          className="ms-2 text-white"
          style={{ fontSize: '1.15rem', fontWeight: '500' }}
        >
          {user.nombre}
        </span>
      )}
    </div>
  );
  const CartIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16" style={{ color: '#C5A25D' }}>
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src={logo}
            width="35"
            height="35"
            className="d-inline-block me-2"
            alt="Áurea Logo"
            style={{ objectFit: 'contain' }}
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
          </Nav>
          <Nav className="d-flex align-items-center">
            {user && user.rol && user.rol.toUpperCase() === 'ADMIN' && (
              <Nav.Link as={Link} to="/admin" className="text-warning fw-bold me-3">
                Panel Admin
              </Nav.Link>
            )}
            <NavDropdown title={UserIcon} id="user-nav-dropdown" align="end" className="no-caret me-2">
              {user ? (
                <>
                  <NavDropdown.Item disabled className="text-muted">Hola, {user.nombre}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Cerrar Sesión</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item as={Link} to="/login">Iniciar Sesión</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/registro">Registrarse</NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            <Nav.Link as={Link} to="/Carrito" className="d-flex align-items-center">
              {CartIcon}
              <span
                className="ms-3 text-white"
                style={{ fontSize: '1.15rem', fontWeight: '500' }}
              >
                Carrito
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;