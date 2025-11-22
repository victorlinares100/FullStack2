export const validateRegistro = (nombre, correo, password, confirmarPassword, region, comuna) => {
  const errors = {};

  // Validar Nombre
  if (!nombre || !nombre.trim()) {
    errors.nombre = "El nombre es obligatorio.";
  }

  //  Validar Correo
  if (!correo) {
    errors.correo = "El correo es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errors.correo = "Formato de correo inválido.";
  }

  //  Validar Contraseña
  if (!password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  // Validar Confirmación
  if (!confirmarPassword) {
    errors.confirmarPassword = "Debes confirmar la contraseña.";
  } else if (password !== confirmarPassword) {
    errors.confirmarPassword = "Las contraseñas no coinciden.";
  }

  // Validar Selects
  if (!region) errors.region = "Debes seleccionar una región.";
  if (!comuna) errors.comuna = "Debes seleccionar una comuna.";

  return errors;
};