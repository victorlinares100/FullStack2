import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap"; 
import { Link } from "react-router-dom";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/Mensaje";
import { validateContacto } from "../utils/validators";
import { useUser } from "../context/UserContext";

// Asegúrate de importar tu CSS aquí si no es global
import "../styles/contacto.css"; 

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
    // Usamos la clase contact-section del CSS para el fondo gris
    <div className="contact-section">
      <Form onSubmit={handleSubmit}>
        
        {/* Título (h2 toma el color dorado del CSS) */}
        <h2>Contacto</h2>

        {mensaje && (
          <Mensaje
            variant={mensaje.tipo}
            text={mensaje.texto}
            onClose={() => setMensaje(null)}
          />
        )}

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

        {/* --- CAMBIO AQUÍ --- */}
        {/* Quitamos el d-flex para que el botón ocupe todo el ancho arriba */}
        
        <Button type="submit" className="btn-contact">
          Enviar Mensaje
        </Button>

        {/* Los enlaces van abajo en su propio contenedor form-footer */}
        <div className="form-footer">
          <span>
            <Link to="/Registro">Registro de Usuario</Link>
          </span>
          <span className="separator">·</span>
          <span>
            <Link to="/login">Inicio de Sesión</Link>
          </span>
        </div>
        
      </Form>
    </div>
  );
}

export default Contacto;