import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/home.css';
import './styles/styles.css';
import './styles/blog.css';
import './styles/footer.css'
import './styles/Nosotros.css';
import './styles/products.css';
import './styles/Contacto.css';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
