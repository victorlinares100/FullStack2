// src/pages/Contacto.jsx
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Input from "../components/molecules/Input"
import Mensaje from "../components/atoms/mensaje";


function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contenido, setContenido] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !contenido) {
      setMensaje({ tipo: "danger", texto: "Por favor, complete todos los campos." });
      return;
    }

    // Aquí podrías enviar los datos a un backend o API
    setMensaje({ tipo: "success", texto: "¡Mensaje enviado correctamente!" });

    setNombre("");
    setCorreo("");
    setContenido("");
  };

  return (
    <>
      <Container className="my-5">
        <h2>Contacto</h2>

        {mensaje && (
          <Mensaje
            variant={mensaje.tipo}
            text={mensaje.texto}
            onClose={() => setMensaje(null)}
          />
        )}

        <Form onSubmit={handleSubmit}>
          <Input
            id="nombre"
            label="Nombre:"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <Input
            id="correo"
            label="Correo:"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <Input
            id="contenido"
            label="Mensaje:"
            as="textarea"
            rows={4}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />

          <div className="d-flex align-items-center gap-3">
            <Button type="submit" variant="primary">
              Enviar Mensaje
            </Button>

            <div>
              <a href="/Registro">Registro de Usuario · </a>
              <a href="/login">Inicio de Sesión</a>
            </div>
          </div>
        </Form>
      </Container>

    </>
  );
}

export default Contacto;
