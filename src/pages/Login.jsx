import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Input from "../components/molecules/Input";
import Text from "../components/atoms/Text";
import Mensaje from "../components/atoms/Mensaje";
import usuarioService from "../services/usuarioService";
import logo from "../assets/img/aurea_logo_con.webp";
import { Link } from "react-router-dom";
import { validateLogin } from "../utils/validators";
import { useUser } from "../context/UserContext";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [errors, setErrors] = useState({}); // Constante para Errores de validación
  const { login } = useUser();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMensaje(null);

    const newErrors = validateLogin(correo, password);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // 1. Llamada al servicio
      const data = await usuarioService.login({ correo, contrasena: password });

      // 2. Extraer token y datos según la estructura del backend (AuthController)
      const { token, usuario, rol } = data;

      // 3. Guardar en el contexto usando la función ajustada
      login({ nombre: usuario, rol: rol }, token);

      setMensaje({ tipo: "success", texto: "Inicio de sesión exitoso" });

      // 4. Redirección basada en el rol
      setTimeout(() => {
        if (rol && rol.toUpperCase() === "ADMIN") {
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
