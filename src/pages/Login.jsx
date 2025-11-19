import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Input from "../components/molecules/Input";
import Text from "../components/atoms/Text";
import Mensaje from "../components/atoms/Mensaje";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
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

    if (usuario.rol === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }

    setCorreo("");
    setPassword("");
  };

  return (
    <Container className="my-5">
      <Text variant="h2">Iniciar Sesión</Text>

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
        <a href="/Registro">¿No tienes cuenta? Regístrate aquí</a>
      </div>
    </Container>
  );
}

export default Login;
