import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/Mensaje";
import Text from "../components/atoms/Text";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contenido, setContenido] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  // Obtener usuario activo desde localStorage
  useEffect(() => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (activo) {
      setUsuarioActivo(activo);
      setCorreo(activo.correo); // autocompleta el correo si está logueado
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !correo || !contenido) {
      setMensaje({ tipo: "danger", texto: "Por favor, complete todos los campos." });
      return;
    }

    // Validar que el correo exista en los usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find((u) => u.correo === correo);

    if (!usuario) {
      setMensaje({ tipo: "danger", texto: "El correo ingresado no está registrado." });
      return;
    }

    // Aquí podrías enviar los datos a un backend o API
    setMensaje({ tipo: "success", texto: "¡Mensaje enviado correctamente!" });

    setNombre("");
    setContenido("");
    // Mantener el correo autocompletado si el usuario está logueado
  };

  return (
    <Container className="my-5 contacto-page">
      <Text variant="h2" className="text-center mb-4">
        Contacto
      </Text>

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
          readOnly={!!usuarioActivo} // Si está logueado, no permitir editar
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
          <div className="links-container">
            <span>
              <a href="/Registro">Registro de Usuario</a>
            </span>
            <span className="separator">·</span>
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
