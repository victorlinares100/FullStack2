import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Contacto() {
  // Estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contenido, setContenido] = useState("");
  const [mensaje, setMensaje] = useState(null);

  // Función para manejar el submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    if (!nombre || !correo || !contenido) {
      setMensaje({ tipo: "danger", texto: "Por favor, complete todos los campos." });
      return;
    }

    // Aquí podrías enviar los datos a un backend o API

    setMensaje({ tipo: "success", texto: "¡Mensaje enviado correctamente!" });

    // Limpiar formulario
    setNombre("");
    setCorreo("");
    setContenido("");
  };

  return (
    <>
      <Container className="my-5">
        <h2>Contacto</h2>

        {mensaje && (
          <Alert variant={mensaje.tipo} onClose={() => setMensaje(null)} dismissible>
            {mensaje.texto}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="nombre" className="mb-3">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="correo" className="mb-3">
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="contenido" className="mb-3">
            <Form.Label>Mensaje:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
            />
          </Form.Group>

          <div className="d-flex align-items-center gap-3">
            <Button type="submit" variant="primary">
              Enviar Mensaje
            </Button>

            <div>
              <a href="/registro">Registro de Usuario · </a>
              <a href="/login">Inicio de Sesión</a>
            </div>
          </div>
        </Form>
      </Container>

      <footer className="text-center py-3 mt-5">
        <p>&copy; 2025 Áurea - Todos los derechos reservados</p>
      </footer>
    </>
  );
}

export default Contacto;
