import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../data/cart'; 

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleAddToCart = () => {
    addProductToCart(product);
    setMensaje("¡Agregado al carrito!");
    setTimeout(() => setMensaje(""), 2000);
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
        
        <div className="d-flex justify-content-between mt-3">
            
            <Button 
                variant="secondary" 
                size="sm"
                onClick={() => navigate(`/products/${product.id}`)}
            >
                Ver detalles
            </Button>
            
            
            <Button 
                variant="primary" 
                size="sm"
                onClick={handleAddToCart}
            >
                Añadir al Carrito
            </Button>
            
        </div>
        {mensaje && <div className="text-success text-center mt-2 fw-bold">{mensaje}</div>}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;