import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/mensaje";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [mensaje, setMensaje] = useState(null);

  // Opciones fijas
  const regiones = ["Región Metropolitana", "Valparaíso", "Biobío"];
  const comunasPorRegion = {
    "Región Metropolitana": ["Santiago", "Maipú", "Puente Alto"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!nombre || !correo || !password || !confirmarPassword || !region || !comuna) {
      setMensaje({ tipo: "danger", texto: "Por favor, complete todos los campos." });
      return;
    }

    if (password !== confirmarPassword) {
      setMensaje({ tipo: "danger", texto: "Las contraseñas no coinciden." });
      return;
    }

    // Guardar en localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const existe = usuarios.find((u) => u.correo === correo);

    if (existe) {
      setMensaje({ tipo: "danger", texto: "El correo ya está registrado." });
      return;
    }

    const nuevoUsuario = { nombre, correo, password, region, comuna };
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setMensaje({ tipo: "success", texto: "¡Usuario registrado correctamente!" });

    // Limpiar campos
    setNombre("");
    setCorreo("");
    setPassword("");
    setConfirmarPassword("");
    setRegion("");
    setComuna("");
  };

  return (
    <>
      

      <Container className="my-5">
        <h2>Registro de Usuario</h2>

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
            label="Nombre completo:"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

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

          <Input
            id="confirmarPassword"
            label="Confirmar contraseña:"
            type="password"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
          />

          {/* Región */}
          <Form.Group controlId="region" className="mb-3">
            <Form.Label>Región:</Form.Label>
            <Form.Select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setComuna("");
              }}
              required
            >
              <option value="">Seleccione una región</option>
              {regiones.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Comuna */}
          <Form.Group controlId="comuna" className="mb-3">
            <Form.Label>Comuna:</Form.Label>
            <Form.Select
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              required
              disabled={!region}
            >
              <option value="">Seleccione una comuna</option>
              {region &&
                comunasPorRegion[region].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="primary">
            Registrarse
          </Button>
        </Form>

        <div className="mt-3">
          <a href="/login">¿Ya tienes cuenta? Inicia sesión aquí</a>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Registro;
