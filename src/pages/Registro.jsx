import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/Mensaje";
import Text from "../components/atoms/Text";
import usuarioService from "../services/usuarioService";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !correo || !password || !confirmarPassword || !region || !comuna) {
      setMensaje({ tipo: "danger", texto: "Por favor, complete todos los campos." });
      return;
    }

    if (password !== confirmarPassword) {
      setMensaje({ tipo: "danger", texto: "Las contraseñas no coinciden." });
      return;
    }
    const nuevoUsuario = { 
      nombre: nombre, 
      correo: correo, 
      contrasena: password,
      region: region, 
      comuna: comuna 
    };

    try {
       
      const data = await usuarioService.registrar(nuevoUsuario);
      
      
      setMensaje({ tipo: "success", texto: typeof data === 'string' ? data : (data.mensaje || "Registro exitoso.") });

    
      setNombre("");
      setCorreo("");
      setPassword("");
      setConfirmarPassword("");
      setRegion("");
      setComuna("");

    } catch (error) {
      console.error("Error al registrar usuario:", error);

      if (error.response && error.response.data){
        const mensajeError = typeof error.response.data === 'string'
          ? error.response.data
          : JSON.stringify(error.response.data);
        setMensaje({ tipo: "danger", texto: `Error: ${mensajeError}` });
      } else {
        setMensaje({ tipo: "danger", texto: "No se pudo conectar con el servidor." });
      }
    }
  };

  return (
    <>
      <Container className="my-5">
        <Text variant="h2">Registro De Usuario</Text>

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
    </>
  );
}

export default Registro;