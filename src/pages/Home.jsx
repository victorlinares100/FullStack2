import React from 'react';
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import ProductCard from '../components/organisms/ProductCard'; 
import products from '../data/Products';



function Home() {
  
  const popularProducts = products.slice(0, 6); 

  const carouselItems = [
    { id: 1, src: 'https://media.istockphoto.com/id/1321017606/es/foto/camisetas-y-camisetas-deportivas-multicolores-sin-mangas.jpg?s=612x612&w=0&k=20&c=hnl_sgqOeWSTTct1-PtvEKGQWy6gPi_FY1IiG1bW910=', alt: 'PRIMER SLIDE' },
    { id: 2, src: 'https://basicvintage.cl/wp-content/uploads/2021/11/bvintage-Julio-22.jpg', alt: 'SEGUNDO SLIDE' },
    { id: 3, src: 'https://e1.pxfuel.com/desktop-wallpaper/997/8/desktop-wallpaper-clothing-store.jpg', alt: 'TERCER SLIDE' },
  ];

  return (
    <>
      <Container className="py-4"> 
        {/* Links de Sesión */}
        <div className="d-flex justify-content-end mb-4"> 
          <Button variant="outline-dark" href="/login" className="me-2">
            Iniciar sesión
          </Button>
          <Button variant="dark" href="/registro">
            Registrarse
          </Button>
        </div>

        <section>       
          <div className="section-spacing mb-5">
            <Carousel>
              {carouselItems.map(item => (
                <Carousel.Item key={item.id}>                 
                  <img
                    className="d-block w-100"
                    src={item.src} 
                    alt={item.alt}
                  />               
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="text-center">
            <h2 className="titulo-seccion my-4">MÁS POPULARES</h2>
          </div>         
          <Row>           
            {popularProducts.map((product) => (
              
              <Col sm={4} key={product.id} className="mb-4 d-flex">
                <ProductCard product={product} /> 
              </Col>
            ))}
          </Row>
        </section>
      </Container>
      
      
      
    </>
  );
}

export default Home;