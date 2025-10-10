import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Footer from "../components/organisms/Footer";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/mensaje";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar coincidencia
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    if (!usuario) {
      setMensaje({ tipo: "danger", texto: "Correo o contraseña incorrectos." });
      return;
    }

    // Guardar usuario activo
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    setMensaje({ tipo: "success", texto: "¡Inicio de sesión exitoso!" });

    // Limpiar formulario
    setCorreo("");
    setPassword("");
  };

  return (
    <>
      <Container className="my-5">
        <h2>Iniciar Sesión</h2>

        {mensaje && (
          <Mensaje
            variant={mensaje.tipo}
            text={mensaje.texto}
            onClose={() => setMensaje(null)}
          />
        )}

        <Form onSubmit={handleSubmit}>
          <Input
            id="correo"
            label="Correo electrónico:"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <Input
            id="password"
            label="Contraseña:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="primary">
            Iniciar Sesión
          </Button>
        </Form>

        <div className="mt-3">
          <a href="/registro">¿No tienes cuenta? Regístrate aquí</a>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Login;
