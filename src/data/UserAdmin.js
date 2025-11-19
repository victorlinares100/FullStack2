export function initAdmin() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existeAdmin = usuarios.find(u => u.correo === "admin@admin.com");
  if (existeAdmin) return;

  const admin = {
    nombre: "Administrador",
    correo: "admin@admin.com",
    password: "123456",
    rol: "admin",
    region: "N/A",
    comuna: "N/A"
  };

  usuarios.push(admin);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}
