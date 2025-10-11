import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/mensaje";
import Text from "../components/atoms/Text";



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
    <Container className="my-5 contacto-page">
      {/* Título de la página usando Text */}
      <Text variant="h2" className="text-center mb-4">
        Contacto
      </Text>

      {/* Mensaje de éxito o error */}
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

        <div className="d-flex align-items-center gap-3 mt-3">
            <Button type="submit" variant="primary">
              Enviar Mensaje
            </Button>
            {/* Quitamos d-flex para que el flexbox padre lo maneje, pero lo dejamos si quieres */}
            <div className="links-container">
              <span>
                <a href="/Registro">Registro de Usuario</a>
              </span>
              <span className="separator">·</span> {/* USAMOS EL PUNTO MEDIO (·) */}
              <span>
                <a href="/login">Inicio de Sesión</a>
              </span>
            </div>
          </div>
      </Form>
    </Container>
  );
}

export default Contacto;
