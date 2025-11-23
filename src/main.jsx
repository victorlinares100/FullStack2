import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/home.css';
import './styles/styles.css';
import './styles/Blog.css';
import './styles/footer.css'
import './styles/nosotros.css';
import './styles/products.css';
import './styles/contacto.css';
import { UserProvider } from './context/UserContext';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </StrictMode>,
)
