import React from "react";
import "../styles/admin.css";
import { Link } from "react-router-dom";

export default function HomeAdmin() {
  return (
    <div className="admin-layout">
      
      <aside className="admin-sidebar">
        <h2>ADMINISTRADOR</h2>
        <Link className="admin-link" to="/admin">Dashboard</Link>
        <Link className="admin-link" to="/productosAdmin">Productos</Link>
        <Link className="admin-link" to="/">Salir</Link>
      </aside>

      <main className="admin-content">
        <h1 className="admin-title">Bienvenido al Panel de Administración</h1>

        <div className="admin-card">
          <p>Gestiona productos, usuarios y el contenido del sitio.</p>
        </div>
      </main>

    </div>
  );
}
