import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/Mensaje";
import Text from "../components/atoms/Text";
import { validateContacto } from "../utils/validators";
import { useUser } from "../context/UserContext";

function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contenido, setContenido] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [errors, setErrors] = useState({});
  const { user } = useUser();

  // Autocompletar correo si hay usuario logueado
  useEffect(() => {
    if (user && user.correo) {
      setCorreo(user.correo); 
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setMensaje(null);

    // Validar usando validators.js
    const newErrors = validateContacto(nombre, correo, contenido);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Verificar si el usuario existe en la "base de datos" (localStorage)
    let usuarioExiste = false;
    try {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarioExiste = usuarios.find((u) => u.correo === correo);
    } catch (error) {
      console.error("Error al leer usuarios:", error);
    }

    // También permitimos si es el usuario actualmente logueado
    const esUsuarioLogueado = user && user.correo === correo;

    if (!usuarioExiste && !esUsuarioLogueado) {
      setMensaje({ tipo: "danger", texto: "El correo ingresado no está registrado en nuestra base de datos." });
      return;
    }

    // Simulación de envío exitoso
    setMensaje({ tipo: "success", texto: "¡Mensaje enviado correctamente!" });
    
    if (!user) {
      setCorreo("");
    }
    setNombre("");
    setContenido("");
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
          error={errors.nombre}
        />

        <Input
          id="correo"
          label="Correo:"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          readOnly={!!user} // Si está logueado, no permitir editar
          error={errors.correo}
        />

        <Input
          id="contenido"
          label="Mensaje:"
          as="textarea"
          rows={4}
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          error={errors.contenido}
        />

        <div className="d-flex align-items-center gap-3 mt-3">
          <Button type="submit" variant="primary">
            Enviar Mensaje
          </Button>
          <div className="links-container">
            <span>
              <Link to="/Registro">Registro de Usuario</Link>
            </span>
            <span className="separator">·</span>
            <span>
              <Link to="/login">Inicio de Sesión</Link>
            </span>
          </div>
        </div>
      </Form>
    </Container>
  );
}

export default Contacto;
