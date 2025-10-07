import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';


// Componente envolvente para mockear useNavigate
const MockRouter = ({ children, mockNavigate }) => {
 const router = createMemoryRouter(
   [{ path: '*', element: children }],
   { initialEntries: ['/'] }
 );
 router.navigate = mockNavigate; // Inyectamos el mock de navigate
 return <RouterProvider router={router} />;
};


describe('ProductCard Component', () => {
 const mockNavigate = jasmine.createSpy('navigate');


 const mockProduct = {
   id: 1,
   name: 'Producto Test',
   description: 'Descripción test',
   price: 10000,
   image: 'test.jpg',
 };


 it('renderiza el título del producto', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   expect(screen.getByText(mockProduct.name)).toBeTruthy();
 });


 it('renderiza la descripción del producto', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   expect(screen.getByText(mockProduct.description)).toBeTruthy();
 });


 it('renderiza el precio del producto', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   expect(screen.getByText(/10000/)).toBeTruthy();
 });


 it('renderiza la imagen del producto', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   const image = screen.getByRole('img', { name: mockProduct.name });
   expect(image).toBeTruthy();
   expect(image.getAttribute('src')).toBe(mockProduct.image);
 });


 it('renderiza el botón de detalles', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   const button = screen.getByText('Ver detalles');
   expect(button).toBeTruthy();
   expect(button).toHaveClass('btn-primary');
 });


 it('navega a detalles al hacer click en el botón', () => {
   render(
     <MockRouter mockNavigate={mockNavigate}>
       <ProductCard product={mockProduct} />
     </MockRouter>
   );
   const button = screen.getByText('Ver detalles');
   fireEvent.click(button);
   expect(mockNavigate).toHaveBeenCalledWith('/products/1', jasmine.any(Object));
 });
});
