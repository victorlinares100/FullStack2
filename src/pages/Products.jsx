import React from 'react';
import { Container, Row } from 'react-bootstrap';
import products from '../data/Products';
import ProductCard from '../components/organisms/ProductCard';
import Text from '../components/atoms/Text';

function Products() {
  return (
    <Container className="my-5">
      <Text variant="h2">Productos</Text>
      <Row>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
}

export default Products;
