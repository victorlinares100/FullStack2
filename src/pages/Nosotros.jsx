// src/pages/Nosotros.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import Text from '../components/atoms/Text';
import Footer from '../components/organisms/Footer';

function Nosotros() {
  return (
    <>
      <Container className="my-5 contenido">
        <Text variant="h2">Nuestra Historia</Text>
        <Text>
          Áurea nació con la idea de ofrecer ropa moderna, cómoda y accesible para
          quienes buscan expresar su estilo personal. Comenzamos como un pequeño
          proyecto y hoy seguimos creciendo gracias a la confianza de nuestros
          clientes.
        </Text>

        <Text variant="h2">Misión</Text>
        <Text>
          Nuestra misión es entregar prendas de calidad, inspiradas en las últimas
          tendencias, que combinen diseño y comodidad para el día a día.
        </Text>

        <Text variant="h2">Visión</Text>
        <Text>
          Queremos ser reconocidos como una marca cercana, confiable y con estilo,
          llevando la moda urbana a todas las personas que buscan marcar la diferencia.
        </Text>

        <Text variant="h2">Valores</Text>
        <ul>
          <Text variant="li">Calidad en cada prenda</Text>
          <Text variant="li">Compromiso con nuestros clientes</Text>
          <Text variant="li">Diseño innovador</Text>
          <Text variant="li">Sostenibilidad y responsabilidad</Text>
        </ul>
      </Container>

      <Footer />
    </>
  );
}

export default Nosotros;
