import React from 'react';
import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../data/cart'; 

function ProductCard({ product }) {
  const navigate = useNavigate();
  const handleAddToCart = () => {
    addProductToCart(product);
    alert(`¡"${product.name}" agregado al carrito!`); 
  };

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Image src={product.image} alt={product.name} className="card-img-top" />
      <Card.Body>
        <CardBody
          title={product.name}
          description={product.description}
          price={product.price}
        />
        
        {/* Contenedor para alinear los dos botones */}
        <div className="d-flex justify-content-between mt-3">
            
            {/* Botón existente: Ver detalles */}
            <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate(`/products/${product.id}`)}
            >
                Ver detalles
            </Button>
            
            {/* Botón NUEVO: Añadir al Carrito */}
            <Button 
                variant="primary" 
                size="sm"
                onClick={handleAddToCart}
            >
                Añadir al Carrito
            </Button>
            
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;