import React from "react";
import AdminLayout from "../components/admin/AdminLayout";

function HomeAdmin() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-4">Bienvenido al Panel de Administración</h1>
      <p className="text-gray-700">
        Desde aquí puedes administrar productos, usuarios y más.
      </p>
    </AdminLayout>
  );
}

export default HomeAdmin;
