// src/pages/ProductsAdmin.jsx (FINAL)
import React, { useState, useEffect } from "react";
import Button from "../components/atoms/Button";
import Text from "../components/atoms/Text";
import DynamicTable from "../components/organisms/DynamicTable";
import CreateModal from "../components/organisms/CreateModel";

const productColumns = ["ID", "Nombre", "Precio", "Acciones"];

const createInputs = [
  { name: "nombre", type: "text", placeholder: "Nombre del producto", required: true },
  { name: "precio", type: "number", placeholder: "Precio", required: true },
];

function ProductsAdmin() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    setLoading(true);
    const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];
    
    // Mapeamos los datos para que coincidan con la tabla y añadimos las acciones
    const dataWithActions = storedProducts.map(p => ({
      id: p.id,
      Nombre: p.nombre, 
      Precio: `$${parseFloat(p.precio).toFixed(2)}`, 
      onEdit: () => abrirEdicion(p),
      onDelete: () => eliminarProducto(p.id),
    }));

    setProductos(dataWithActions);
    setLoading(false);
  };

  const abrirEdicion = (producto) => {
    setEditingProducto(producto); 
    setIsModalOpen(true);
  };

  const guardarEnStorage = (data) => {
    localStorage.setItem("productos", JSON.stringify(data));
  };

  const eliminarProducto = (id) => {
    if (!window.confirm("¿Quieres eliminar este producto?")) return; // Usar window.confirm

    const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];
    const updated = storedProducts.filter(p => p.id !== id);

    guardarEnStorage(updated);
    cargarProductos(); 
    alert("Producto eliminado con éxito!"); 
  };

  const handleCreate = async (formData) => {
    setSubmitLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); 

    const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];
    let updated;
    try {
        if (editingProducto) {
            updated = storedProducts.map(p =>
                p.id === editingProducto.id ? { ...p, ...formData } : p
            );
            alert("Producto actualizado con éxito!");
        } else {
            updated = [...storedProducts, { id: Date.now(), ...formData }];
            alert("Producto creado con éxito!");
        }
    
        guardarEnStorage(updated);
        cargarProductos(); 
    } catch(error) {
        alert("Ocurrió un error al guardar.");
        console.error(error);
    } finally {
        setEditingProducto(null);
        setIsModalOpen(false);
        setSubmitLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <header className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Productos</h1>
            <p className="text-gray-500">Aquí puedes crear, editar y eliminar los productos de tu tienda.</p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Productos Activos</h2>
                <Button
                    text="Crear Producto"
                    onClick={() => {
                        setEditingProducto(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md active:scale-95 transition-all"
                >
                    Crear Producto
                </Button>
            </div>
            
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <DynamicTable
                    columns={productColumns}
                    data={productos}
                    striped={true}
                    hover={true}
                    emptyMessage="No hay productos activos. ¡Crea uno nuevo!"
                />
            )}
        </div>

      </div>

      <CreateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProducto(null);
        }}
        onSubmit={handleCreate}
        inputsConfig={createInputs}
        title={editingProducto ? "Editar Producto" : "Crear Nuevo Producto"}
        submitText={editingProducto ? "Actualizar Producto" : "Crear Producto"}
        loading={submitLoading}
        initialData={editingProducto || {}} 
      />
    </div>
  );
}

export default ProductsAdmin;