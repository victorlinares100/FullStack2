// src/pages/Nosotros.jsx

import { Container, Row, Col, Card } from "react-bootstrap";
import "../styles/nosotros.css";

const values = [
  { title: "Calidad", desc: "Seleccionamos cada producto con estándares rigurosos.", icon: "✨" },
  { title: "Confianza", desc: "Más de 5 años entregando seguridad a nuestros clientes.", icon: "🤝" },
  { title: "Innovación", desc: "Buscamos siempre las últimas tendencias para ti.", icon: "🚀" }
];

const team = [
  { name: "Pablo Contreras", role: "Fundador" },
  { name: "Victor Linares ", role: "Logística" },
  { name: "Benjamín Dattoli", role: "Atención al Cliente" }
];

function Nosotros() {
  return (
    <div className="nosotros-page">
      <section className="nosotros-hero">
        <Container>
          <Row className="justify-content-center text-center">
            <Col md={8}>
              <h1 className="display-4 fw-bold">Nuestra Historia</h1>
              <p className="lead">Redefiniendo el estilo en Chile desde 2025.</p>
            </Col>
          </Row>
        </Container>
      </section>
      <Container className="my-5 py-4">
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <h2 className="section-title">¿Quiénes Somos?</h2>
            <p>
              Áurea nació de una idea simple: hacer que la calidad sea accesible.
              Lo que comenzó en un pequeño garaje en Santiago se ha convertido en una
              comunidad de personas apasionadas por el diseño y la excelencia.
            </p>
            <p>
              Nuestra misión es empoderar a nuestros clientes a través de productos
              que reflejen su personalidad única.
            </p>
          </Col>
          <Col md={6}>
            <div className="nosotros-img-wrapper">
              <img src="/src/assets/img/fondo_aurea.webp" alt="Oficina Aurea" className="img-fluid rounded shadow-lg" />
            </div>
          </Col>
        </Row>
      </Container>

      <section className="nosotros-values bg-light py-5">
        <Container>
          <h2 className="text-center mb-5">Nuestros Valores</h2>
          <Row>
            {values.map((v, i) => (
              <Col key={i} md={4} className="text-center mb-4">
                <div className="value-icon mb-3">{v.icon}</div>
                <h4 className="fw-bold">{v.title}</h4>
                <p className="text-muted">{v.desc}</p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>


      <Container className="my-5 py-4">
        <h2 className="text-center mb-5">El Equipo Detrás de Aurea</h2>
        <Row>
          {team.map((m, i) => (
            <Col key={i} md={4} className="mb-4">
              <Card className="team-card border-0 text-center shadow-sm">
                <Card.Img variant="top" src={m.img} className="rounded-circle mx-auto mt-4" style={{ width: '120px' }} />
                <Card.Body>
                  <Card.Title className="fw-bold">{m.name}</Card.Title>
                  <Card.Text className="text-primary fw-medium">{m.role}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Nosotros;