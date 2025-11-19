import React, { useState, useEffect } from "react";
import AdminLayout from "../components/admin/AdminLayout";

function ProductsAdmin() {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "" });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(data);
  }, []);

  const guardarProductos = (data) => {
    setProductos(data);
    localStorage.setItem("productos", JSON.stringify(data));
  };

  const agregarProducto = () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    const updated = [...productos, { id: Date.now(), ...nuevoProducto }];
    guardarProductos(updated);

    setNuevoProducto({ nombre: "", precio: "" });
  };

  const eliminarProducto = (id) => {
    const updated = productos.filter((p) => p.id !== id);
    guardarProductos(updated);
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Gestión de Productos</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-3">Agregar Producto</h2>

        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 mr-3"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
        />

        <input
          type="number"
          placeholder="Precio"
          className="border p-2 mr-3"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={agregarProducto}
        >
          Agregar
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">Lista de Productos</h2>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">${p.precio}</td>
              <td className="p-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => eliminarProducto(p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

export default ProductsAdmin;
