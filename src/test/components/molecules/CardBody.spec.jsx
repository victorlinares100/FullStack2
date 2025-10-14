import React from 'react';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody Component', () => {
  const props = {
    title: 'Producto Test',
    description: 'Descripción del producto',
    price: 100,
  };

  it('muestra el título con el tag h5', () => {
    render(<CardBody {...props} />);
    const title = screen.getByText(props.title);
    expect(title).toBeTruthy();
    expect(title.tagName.toLowerCase()).toBe('h5');
  });

  it('muestra la descripción con el tag p', () => {
    render(<CardBody {...props} />);
    const desc = screen.getByText(props.description);
    expect(desc).toBeTruthy();
    expect(desc.tagName.toLowerCase()).toBe('p');
  });

  it('muestra el precio con el tag span y clase text-muted', () => {
    render(<CardBody {...props} />);
    const price = screen.getByText(`$${props.price}`);
    expect(price).toBeTruthy();
    expect(price.tagName.toLowerCase()).toBe('span');
    expect(price.className).toContain('text-muted');
  });
});
