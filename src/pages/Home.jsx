import React from 'react';
import { Container, Carousel, Row, Col, Button } from 'react-bootstrap';
import ProductCard from '../components/organisms/ProductCard'; 
import products from '../data/Products';
import carruselPhoto from '../assets/img/carrusel_photo.webp';


function Home() {
  
  const popularProducts = products.slice(0, 6); 

  const carouselItems = [
    { 
      id: 1, 
      src: carruselPhoto, 
      alt: 'PRIMER SLIDE',
      title: 'Nueva Colección',
      description: 'Descubre las últimas tendencias 2025.',
      buttonText: 'Ver tendencias',
      link: '/products'
    },
  ];

  return (
    <>
      <Container className="py-4"> 
        <section>       
          <div className="section-spacing mb-5">
            <Carousel className="carousel-limit-height" interval={3000} fade>
              {carouselItems.map(item => (
                <Carousel.Item key={item.id}>                 
                  <img
                    className="d-block w-100"
                    src={item.src} 
                    alt={item.alt}
                  />
                  <Carousel.Caption className="carousel-caption-custom">
                    <h3 className="display-4 fw-bold">{item.title}</h3>
                    <p className="lead">{item.description}</p>
                    <Button variant="light" size="lg" href={item.link}>
                      {item.buttonText}
                    </Button>
                  </Carousel.Caption>               
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