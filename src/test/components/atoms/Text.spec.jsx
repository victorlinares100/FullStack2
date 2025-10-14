import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Component', () => {
  it('renderiza el texto pasado como children', () => {
    render(<Text>Hola Mundo</Text>);
    expect(screen.getByText('Hola Mundo')).toBeTruthy();
  });

  it('usa el tag por defecto <p> si no se pasa variant', () => {
    render(<Text>Parrafo por defecto</Text>);
    const element = screen.getByText('Parrafo por defecto');
    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('usa el tag especificado en variant', () => {
    render(<Text variant="h1">Título</Text>);
    const element = screen.getByText('Título');
    expect(element.tagName.toLowerCase()).toBe('h1');
  });

  it('aplica correctamente la clase pasada', () => {
    render(<Text className="mi-clase">Con clase</Text>);
    const element = screen.getByText('Con clase');
    expect(element.className).toContain('mi-clase');
  });
});
