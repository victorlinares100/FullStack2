import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import products from '../data/Products.js';
import Image from '../components/atoms/Image.jsx';
import Text from '../components/atoms/Text.jsx';
import '../styles/ProductDetail.css'; 

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <Container className="my-5">
        <Text variant="h2">Producto no encontrado</Text>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="product-detail-card">
        <Image
          src={product.image}
          alt={product.name}
          className="product-detail-image"
        />
        <Card.Body>
          <Text variant="h2">{product.name}</Text>
          <Text variant="p">{product.description}</Text>
          <Text variant="h4">${product.price}</Text>
        </Card.Body>
        <Button as={Link} to="/" variant="warning">
        Ir al inicio
        </Button>
      </Card>
      
    </Container>
  );
}

export default ProductDetail;
