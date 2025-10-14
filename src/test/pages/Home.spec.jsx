import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../pages/Home';
import products from '../../data/Products';

describe('Home Page', () => {
  function renderHome() {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  }

  it('renderiza los enlaces de sesión', () => {
    renderHome();
    expect(screen.getByText('Iniciar sesión')).toBeTruthy();
    expect(screen.getByText('Registrarse')).toBeTruthy();
  });

  it('renderiza el carousel con 3 slides', () => {
    renderHome();
    // Buscar por alt específico
    const slide1 = screen.getByAltText('PRIMER SLIDE');
    const slide2 = screen.getByAltText('SEGUNDO SLIDE');
    const slide3 = screen.getByAltText('TERCER SLIDE');

    expect(slide1).toBeTruthy();
    expect(slide2).toBeTruthy();
    expect(slide3).toBeTruthy();
  });

  it('renderiza los productos más populares', () => {
    renderHome();
    // Verificamos que los nombres de los primeros 6 productos se vean
    products.slice(0, 6).forEach(product => {
      expect(screen.getByText(product.name)).toBeTruthy();
    });
  });
});
