import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Input from "../components/molecules/Input";
import Mensaje from "../components/atoms/Mensaje";
import Text from "../components/atoms/Text";
import usuarioService from "../services/usuarioService";
import { validateRegistro } from "../utils/validators";
import '../styles/register.css';

function Registro() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [mensaje, setMensaje] = useState(null);
  const [errors, setErrors] = useState({});

const regiones = [
  "Arica y Parinacota",
  "Tarapacá",
  "Antofagasta",
  "Atacama",
  "Coquimbo",
  "Valparaíso",
  "Región Metropolitana",
  "O'Higgins",
  "Maule",
  "Ñuble",
  "Biobío",
  "Araucanía",
  "Los Ríos",
  "Los Lagos",
  "Aysén",
  "Magallanes"
];
const comunasPorRegion = {
  "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
  "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara"],
  "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "San Pedro de Atacama", "Tocopilla"],
  "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Huasco"],
  "Coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Vicuña", "Ovalle", "Combarbalá", "Illapel", "Salamanca", "Los Vilos"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Concón", "Quintero", "Puchuncaví", "Quilpué", "Villa Alemana", "San Antonio", "Cartagena", "Algarrobo", "Los Andes", "San Felipe", "Quillota", "La Calera", "Limache", "Olmué"],
  "Región Metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "San Bernardo", "Buin", "Melipilla", "Talagante"],
  "O'Higgins": ["Rancagua", "Machalí", "Graneros", "Rengo", "San Vicente", "Pichilemu", "San Fernando", "Santa Cruz", "Chimbarongo"],
  "Maule": ["Talca", "Constitución", "Curicó", "Teno", "Molina", "Linares", "San Javier", "Parral", "Cauquenes"],
  "Ñuble": ["Chillán", "Chillán Viejo", "Bulnes", "San Carlos", "Coihueco", "Quillón", "Yungay"],
  "Biobío": ["Concepción", "Talcahuano", "San Pedro de la Paz", "Chiguayante", "Hualpén", "Coronel", "Lota", "Tomé", "Penco", "Los Ángeles", "Nacimiento", "Mulchén", "Arauco", "Lebu", "Cañete"],
  "Araucanía": ["Temuco", "Padre Las Casas", "Lautaro", "Villarrica", "Pucón", "Loncoche", "Angol", "Collipulli", "Victoria"],
  "Los Ríos": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Paillaco", "La Unión", "Río Bueno", "Panguipulli", "Futrono"],
  "Los Lagos": ["Puerto Montt", "Puerto Varas", "Llanquihue", "Frutillar", "Osorno", "Puyehue", "Castro", "Ancud", "Chonchi", "Quellón", "Chaitén"],
  "Aysén": ["Coyhaique", "Aysén", "Cisnes", "Chile Chico", "Río Ibáñez", "Cochrane", "Tortel"],
  "Magallanes": ["Punta Arenas", "Puerto Natales", "Torres del Paine", "Porvenir", "Cabo de Hornos", "Antártica"]
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegistro(nombre, correo, password, confirmarPassword, region, comuna);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({}); // Limpiar errores si todo está bien

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
        setMensaje({ tipo: "danger", texto: `${mensajeError}` });
      } else {
        setMensaje({ tipo: "danger", texto: "No se pudo conectar con el servidor." });
      }
    }
  };

  return (
    <>
      <Container className="my-5">
        <Text variant="h2">Registro De Usuario</Text>

        <Form onSubmit={handleSubmit} noValidate>
          <Input
            id="nombre"
            label="Nombre completo:"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            error={errors.nombre}
          />

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

          <Input
            id="confirmarPassword"
            label="Confirmar contraseña:"
            type="password"
            value={confirmarPassword}
            onChange={(e) => setConfirmarPassword(e.target.value)}
            error={errors.confirmarPassword}
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
              isInvalid={!!errors.region}
            >
              <option value="">Seleccione una región</option>
              {regiones.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.region}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Comuna */}
          <Form.Group controlId="comuna" className="mb-3">
            <Form.Label>Comuna:</Form.Label>
            <Form.Select
              value={comuna}
              onChange={(e) => setComuna(e.target.value)}
              disabled={!region}
              isInvalid={!!errors.comuna}
            >
              <option value="">Seleccione una comuna</option>
              {region &&
                comunasPorRegion[region].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.comuna}
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="register-button" type="submit">
            Registrarse
          </Button>

      

        </Form>

             {mensaje && (
          <Mensaje
            variant={mensaje.tipo}
            text={mensaje.texto}
            onClose={() => setMensaje(null)}
          />
        )}

        {/* Quitamos el style rojo y usamos la clase 'register-link' */}
        <div className="mt-3 register-link">
          <a href="/login">¿Ya tienes cuenta? Inicia sesión aquí</a>
        </div>
      </Container>  
    </>
  );
}

export default Registro;