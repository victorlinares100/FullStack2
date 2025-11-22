 import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Carrito from './pages/carrito';
import Footer from './components/organisms/Footer';
import { initAdmin } from './data/UserAdmin';
import HomeAdmin from './pages/Admin';
import ProductsAdmin from './pages/ProductsAdmin';
import { Nav } from 'react-bootstrap';

function App() {

  const location = useLocation();

  // Rutas donde NO queremos mostrar el Navbar
  const hideNavbar = ["/registro", "/login"].includes(location.pathname.toLowerCase());

  // Detectar rutas de administrador
  const isAdmin =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/productosAdmin");

  useEffect(() => {
    initAdmin();  
  }, []);

  return (
    <div className="app-container">

      {/* Mostrar navbar solo si no es admin Y no está en la lista de ocultos */}
      {!isAdmin && !hideNavbar && <NavBar />}

      <main style={{ flex: 1, marginTop: isAdmin ? 0 : "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/carrito" element={<Carrito />} />

          {/* Admin */}
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/productosAdmin" element={<ProductsAdmin />} />
        </Routes>
      </main>

      {/* No mostrar footer en admin */}
      {!isAdmin && <Footer />}
    </div>
  );
}

export default App;
