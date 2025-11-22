import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Input from "../components/molecules/Input";
import Text from "../components/atoms/Text";
import Mensaje from "../components/atoms/Mensaje";
import usuarioService from "../services/usuarioService";  

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo || !password) {
      setMensaje({ tipo: "danger", texto: "Por favor, ingrese correo y contraseña" });
      return;
    }

    // Validación directa para admin
    if (correo === "admin@admin.com" && password === "123456") {
      setMensaje({ tipo: "success", texto: "Inicio de sesión como administrador" });

      setTimeout(() => {
        navigate("/admin");
      }, 1000);

      return;
    }

    const credenciales = {
      correo: correo,
      contrasena: password
    };

    try {
      const usuarioRecibido = await usuarioService.login(credenciales);
      setMensaje({ tipo: "success", texto: "Inicio de sesión exitoso" });

      setTimeout(() => {
        if (usuarioRecibido.rol && usuarioRecibido.rol.toUpperCase() === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMensaje({ tipo: "danger", texto: "Correo o contraseña incorrectos." });
      } else {
        setMensaje({ tipo: "danger", texto: "No se pudo conectar con el servidor." });
      }
    }
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
