import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap"; // Ya no necesitamos Container
import { Link } from "react-router-dom";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/Mensaje";
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
      setMensaje({
        tipo: "danger",
        texto: "El correo ingresado no está registrado en nuestra base de datos."
      });
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
    <div className="contact-section">
      <Form onSubmit={handleSubmit}>
        
        {/* Título Estilizado */}
        <h2>Contacto</h2>

        {/* Mensaje de alerta */}
        {mensaje && (
          <Mensaje
            variant={mensaje.tipo}
            text={mensaje.texto}
            onClose={() => setMensaje(null)}
          />
        )}

        {/* Inputs */}
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
          readOnly={!!user}
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

        {/* Botón Full Ancho */}
        <Button type="submit" className="btn-contact">
          Enviar Mensaje
        </Button>

        {/* Pie de página con enlaces separados */}
        <div className="form-footer">
          <span className="text-muted">¿No tienes cuenta? </span>
          <Link to="/Registro">Registro de Usuario</Link>
          
          <span className="separator">•</span>
          
          <Link to="/login">Inicio de Sesión</Link>
        </div>
        
      </Form>
    </div>
  );
}

export default Contacto;