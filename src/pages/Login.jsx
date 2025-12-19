import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/molecules/Input";
import Text from "../components/atoms/Text";
import Mensaje from "../components/atoms/Mensaje";
import usuarioService from "../services/usuarioService";
import { validateLogin } from "../utils/validators";
import { useUser } from "../context/UserContext";
import logo from "../assets/img/aurea_logo_con.webp";

function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [errors, setErrors] = useState({});
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
      const data = await usuarioService.login({ correo, contrasena: password });

      console.log("DEBUG - Respuesta completa del service:", data);

      // Deben llamarse igual que en el backend (Map response)
      const { token, nombre, rol } = data;

      if (!token) {
        setMensaje({ tipo: "danger", texto: "Error: No se recibió el token de seguridad." });
        return;
      }

      // Guardamos el objeto { nombre, rol } para que Navbar.jsx lea user.nombre
      login({ nombre, rol }, token);

      setMensaje({ tipo: "success", texto: "¡Bienvenido, " + nombre + "!" });

      setTimeout(() => {
        if (rol && rol.toUpperCase() === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1500);

    } catch (error) {
      const msg = error.response?.status === 401 ? "Correo o clave incorrectos." : "Error de servidor.";
      setMensaje({ tipo: "danger", texto: msg });
    }
  };

  return (
    <Container className="my-5 d-flex flex-column align-items-center">
      <div className="text-center mb-4">
        <Link to="/"><img src={logo} alt="Logo" style={{ width: "150px" }} /></Link>
        <Text variant="h2">Iniciar Sesión</Text>
      </div>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        {mensaje && <Mensaje variant={mensaje.tipo} text={mensaje.texto} onClose={() => setMensaje(null)} />}
        <Form onSubmit={handleSubmit} noValidate>
          <Input id="correo" label="Correo:" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} error={errors.correo} />
          <Input id="password" label="Clave:" type="password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
          <Button type="submit" variant="primary" className="w-100 mt-3">Entrar</Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;