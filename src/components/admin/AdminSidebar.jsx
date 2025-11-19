import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="block hover:text-yellow-400">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin/products" className="block hover:text-yellow-400">
            Productos
          </Link>
        </li>

        <li>
          <a href="/" className="block text-red-400 hover:text-red-300">
            Salir
          </a>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
