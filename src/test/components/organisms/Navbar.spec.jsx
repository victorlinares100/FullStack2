import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../../../components/organisms/Navbar';

describe('NavBar Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );
  });

  it('renderiza el nombre de la marca', () => {
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('renderiza todos los enlaces del navbar', () => {
    const links = ['Inicio', 'Productos', 'Nosotros', 'Contactanos', 'Blog', 'Carrito'];
    links.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeTruthy();
    });
  });

  it('los enlaces tienen href correctos', () => {
    const linkMap = {
      'Inicio': '/',
      'Productos': '/products',
      'Nosotros': '/Nosotros',
      'Contactanos': '/Contacto',
      'Blog': '/Blog',
      'Carrito': '/Carrito'
    };

    Object.entries(linkMap).forEach(([text, href]) => {
      const anchor = screen.getByText(text).closest('a');
      expect(anchor).not.toBeNull();
      expect(anchor.getAttribute('href')).toBe(href);
    });
  });
});
