import React from 'react';
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/organisms/ProductCard'; 
import products from '../data/Products';

function Home() {
  // 1. Definir los productos que van en la sección "MÁS POPULARES" (los 6 primeros)
  const popularProducts = products.slice(0, 6); 

  // 2. Datos del Carrusel (Ajusta la ruta de 'src' si es necesario)
  // NOTA: Asumo que las imágenes están en la carpeta 'public' de Vite para usar la ruta absoluta '/assets/img/...'
  const carouselItems = [
    { id: 1, src: 'https://media.istockphoto.com/id/1321017606/es/foto/camisetas-y-camisetas-deportivas-multicolores-sin-mangas.jpg?s=612x612&w=0&k=20&c=hnl_sgqOeWSTTct1-PtvEKGQWy6gPi_FY1IiG1bW910=', alt: 'PRIMER SLIDE' },
    { id: 2, src: 'https://basicvintage.cl/wp-content/uploads/2021/11/bvintage-Julio-22.jpg', alt: 'SEGUNDO SLIDE' },
    { id: 3, src: 'https://e1.pxfuel.com/desktop-wallpaper/997/8/desktop-wallpaper-clothing-store.jpg', alt: 'TERCER SLIDE' },
  ];

  return (
    <>
      <Container className="py-4"> 
        {/* Links de Sesión */}
        {/* Usamos <Container> y lo centramos, tal como el <div> del HTML anterior */}
        <div className="d-flex mb-3"> 
          <a className="font me-3" href="/login">Iniciar sesión </a>
          <a className="font" href="/registro">Registrarse</a>
        </div>

        <section>
          {/* Carrusel (Usando componente de React-Bootstrap para funcionalidad) */}
          <div className="section-spacing mb-5">
            <Carousel>
              {carouselItems.map(item => (
                <Carousel.Item key={item.id}>
                  {/* Utiliza un <img> simple para el carrusel */}
                  <img
                    className="d-block w-100"
                    src={item.src} 
                    alt={item.alt}
                  />
                  {/* Opcionalmente puedes añadir un <Carousel.Caption> si lo deseas */}
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          {/* Sección "MÁS POPULARES" */}
          <h2 className="titulo-seccion text-center my-4">MÁS POPULARES</h2>

          {/* La clase "row" de Bootstrap (para el layout de 3 columnas) */}
          <Row>
            {/* Iteramos sobre los productos y usamos tu componente ProductCard */}
            {popularProducts.map((product) => (
              // Usamos el componente Col de React-Bootstrap para las columnas
              // col-sm-4 logra el layout de 3 columnas en pantallas medianas
              <Col sm={4} key={product.id} className="mb-4 d-flex">
                <ProductCard product={product} /> 
              </Col>
            ))}
          </Row>
        </section>
      </Container>
      
      {/* Footer (Lo ideal es que este también vaya en App.jsx si es fijo) */}
      <footer>
        <p className="text-center py-3">&copy; 2025 Áurea - Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default Home;