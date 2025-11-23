import React, { useEffect } from 'react';
import { Routes, Route, useLocation, matchPath } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Carrito from './pages/Carrito';
import Footer from './components/organisms/Footer';
import { initAdmin } from './data/UserAdmin';
import HomeAdmin from './pages/Admin';
import ProductsAdmin from './pages/ProductsAdmin';
import FixedFooter from './components/organisms/FixedFooter';
import NotFound from './pages/NotFound';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    initAdmin();  
  }, []);

  // Rutas validas de la pagina web, cualquier otra sera 404
  const validRoutes = [
    "/",
    "/products",
    "/products/:id",
    "/nosotros",
    "/contacto",
    "/registro",
    "/login",
    "/blog",
    "/carrito",
    "/admin",
    "/productosAdmin"
  ];

  // Verifica si la ruta actual coincide con alguna de las rutas válidas
  const isNotFound = !validRoutes.some(path => matchPath({ path, end: true }, pathname));

  // Lógica para ocultar componentes
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/productosAdmin");
  const hideNavBar = ["/registro", "/login"].includes(pathname) || isAdminRoute || isNotFound;
  const hideFooter = ["/login", "/registro", "/carrito", "/contacto", "/nosotros"].includes(pathname) || isAdminRoute || isNotFound;
  const hideFixedFooter = ["/", "/products", "/blog"].includes(pathname) || isAdminRoute || isNotFound;

  return (
    <div className="app-container">
      {!hideNavBar && <NavBar />}

      <main style={{ flex: 1 }}>
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
          
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}
      {!hideFixedFooter && <FixedFooter />}
    </div>
  );
}

export default App;
