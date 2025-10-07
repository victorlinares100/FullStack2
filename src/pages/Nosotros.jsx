import React from "react";
import { Container } from "react-bootstrap";

function Nosotros() {
  return (
    <>
      {/* Contenido principal */}
      <Container className="my-5 contenido">
        <h2>Nuestra Historia</h2>
        <p>
          Áurea nació con la idea de ofrecer ropa moderna, cómoda y accesible para
          quienes buscan expresar su estilo personal. Comenzamos como un pequeño
          proyecto y hoy seguimos creciendo gracias a la confianza de nuestros
          clientes.
        </p>

        <h2>Misión</h2>
        <p>
          Nuestra misión es entregar prendas de calidad, inspiradas en las últimas
          tendencias, que combinen diseño y comodidad para el día a día.
        </p>

        <h2>Visión</h2>
        <p>
          Queremos ser reconocidos como una marca cercana, confiable y con estilo,
          llevando la moda urbana a todas las personas que buscan marcar la diferencia.
        </p>

        <h2>Valores</h2>
        <ul>
          <li>Calidad en cada prenda</li>
          <li>Compromiso con nuestros clientes</li>
          <li>Diseño innovador</li>
          <li>Sostenibilidad y responsabilidad</li>
        </ul>
      </Container>

      {/* Footer */}
      <footer className="text-center py-3">
        <p>&copy; 2025 Áurea - Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default Nosotros;
