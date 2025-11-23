import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="text-center my-5" style={{ maxWidth: 560 }}>
      <h1 className="display-5 mb-2">404</h1>
      <p className="lead mb-4">La página que buscas no existe.</p>

      <div className="d-flex justify-content-center gap-2">
        <Button as={Link} to="/" variant="primary">Volver al menú</Button>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>Volver atrás</Button>
      </div>
    </Container>
  );
}
