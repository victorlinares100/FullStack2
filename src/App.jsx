// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Registro from './pages/Registro';
import Login from './pages/Login';
import Blog from './pages/Blog';
import Footer from './components/organisms/Footer';
import Carrito from './pages/Carrito';


function App() {
  return (
    <div className="app-container">
      <NavBar />
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
