import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profiler } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ProductDetail from '../../../pages/ProductDetail';


// Mock de useParams
const mockUseParams = jasmine.createSpy('useParams');


// Mock de Products.js
const mockProducts = [
 {
   id: 1,
   name: 'Producto 1',
   description: 'Descripción breve del producto 1.',
   price: 10000,
   image: 'https://xtremeplay.cl/wp-content/uploads/2023/01/TOYCOLGSM2417.jpg',
 },
];


// Mockear el módulo Products.js
beforeEach(() => {
 delete require.cache[require.resolve('../../../data/Products.js')];
 require.cache[require.resolve('../../../data/Products.js')] = {
   exports: { default: mockProducts },
 };
});


afterEach(() => {
 delete require.cache[require.resolve('../../../data/Products.js')];
});


// Componente envolvente para mockear useParams
const MockRouter = ({ children, params }) => {
 mockUseParams.and.returnValue(params);
 const router = createMemoryRouter(
   [{ path: '*', element: children }],
   { initialEntries: ['/products/:id'] }
 );
 return <RouterProvider router={router} />;
};


describe('ProductDetail Page', () => {
 let renderSpy;


 beforeEach(() => {
   renderSpy = jasmine.createSpy('onRender');
   mockUseParams.and.returnValue({ id: '1' });
   console.log('mockUseParams devuelve:', mockUseParams());
 });


 it('muestra mensaje de error cuando el producto no existe', () => {
   mockUseParams.and.returnValue({ id: '999' });
   render(
     <Profiler id="ProductDetail" onRender={renderSpy}>
       <MockRouter params={{ id: '999' }}>
         <ProductDetail />
       </MockRouter>
     </Profiler>
   );
   console.log(screen.debug()); // Inspeccionar el DOM
   expect(screen.getByText('Producto no encontrado')).toBeTruthy();
 });


 it('mide el tiempo de renderizado del componente', () => {
   render(
     <Profiler id="ProductDetail" onRender={renderSpy}>
       <MockRouter params={{ id: '1' }}>
         <ProductDetail />
       </MockRouter>
     </Profiler>
   );
   console.log(screen.debug()); // Inspeccionar el DOM
   expect(renderSpy).toHaveBeenCalled();
   const call = renderSpy.calls.mostRecent();
   const actualDuration = call.args[3]; // actualDuration de onRender
   console.log('Tiempo de renderizado de ProductDetail:', actualDuration, 'ms');
   expect(actualDuration).toBeLessThan(100); // Umbral ajustado a 100 ms
 });
});