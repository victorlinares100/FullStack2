import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Input from "../components/molecules/Input";
import Text from "../components/atoms/Text";
import Mensaje from "../components/atoms/Mensaje";
import usuarioService from "../services/usuarioService";
import logo from "../assets/img/aurea_logo_con.webp";
import {Link} from "react-router-dom";  
import { validateLogin } from "../utils/validators";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [errors, setErrors] = useState({}); // Estado para errores específicos

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Limpiar errores previos
    setMensaje(null);

    // Validaciones usando utils/validators.js
    const newErrors = validateLogin(correo, password);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
        // Asignamos el error al campo correspondiente o mostramos mensaje general
        setMensaje({ tipo: "danger", texto: "Correo o contraseña incorrectos." });
      } else {
        setMensaje({ tipo: "danger", texto: "No se pudo conectar con el servidor." });
      }
    }
  };

  return (
    <Container className="my-5 d-flex flex-column align-items-center">
      <div className="text-center mb-4">
        <Link to="/">
          <img 
            src={logo} 
            alt="Logo Aurea" 
            style={{ width: "150px", height: "auto", borderRadius: "50%" }} 
            className="mb-3"
          />
        </Link>
        <Text variant="h2">Iniciar Sesión</Text>
      </div>

      <div style={{ width: "100%", maxWidth: "400px" }}>
        {mensaje && (
          <Mensaje
            variant={mensaje.tipo}
            text={mensaje.texto}
            onClose={() => setMensaje(null)}
          />
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Input
            id="correo"
            label="Correo electrónico:"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            error={errors.correo}
          />

          <Input
            id="password"
            label="Contraseña:"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />

          <Button type="submit" variant="primary" className="w-100 mt-3">
            Iniciar Sesión
          </Button>
        </Form>

        <div className="mt-4 text-center">
          <a href="/registro" className="text-decoration-none">
            ¿No tienes cuenta? <strong>Regístrate aquí</strong>
          </a>
        </div>
      </div>
    </Container>
  );
}

export default Login;
