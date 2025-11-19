import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Section from "../components/templates/Section"; 
import CreateModal from "../components/organisms/CreateModel";
import Button from "../components/atoms/Button";
import { productsData } from "../data/ProductsData";
import { generarMensaje } from "../utils/GenerarMensaje"; 

const productColumns = ["ID", "Nombre", "Precio", "Acciones"];

const createInputs = [
    { name: "nombre", type: "text", placeholder: "Nombre del producto", required: true },
    { name: "precio", type: "number", placeholder: "Precio", required: true },
];

function ProductsAdmin() {

    const navigate = useNavigate();

    const [pageData, setPageData] = useState(productsData); 
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingProducto, setEditingProducto] = useState(null);

    useEffect(() => {
        cargarProductos();
    }, []);

    const findTableItem = (data) => data.find(i => i.service === "productos");

    const cargarProductos = () => {
        setLoading(true);
        const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];
        
        const dataWithActions = storedProducts.map(p => ({
            id: p.id,
            Nombre: p.nombre, 
            Precio: `$${parseFloat(p.precio).toFixed(2)}`, 
            onEdit: () => abrirEdicion(p),
            onDelete: () => eliminarProducto(p.id),
        }));

        // Actualizamos la data en pageData
        setPageData(currentData => {
            const updatedData = [...currentData];
            const tableItem = findTableItem(updatedData);
            if (tableItem) {
                tableItem.data = dataWithActions;
                tableItem.columns = productColumns; 
            }
            return updatedData;
        });

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
        if (!window.confirm("¿Quieres eliminar este producto?")) return; 

        try {
            const storedProducts = JSON.parse(localStorage.getItem("productos")) || [];
            const updated = storedProducts.filter(p => p.id !== id);

            guardarEnStorage(updated);
            cargarProductos(); 
            generarMensaje("Producto eliminado con éxito!", "success");
        } catch (error) {
            generarMensaje("Error al eliminar el producto", "warning");
        }
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
                generarMensaje("Producto actualizado con éxito!", "success");
            } else {
                updated = [...storedProducts, { id: Date.now(), ...formData }];
                generarMensaje("Producto creado con éxito!", "success");
            }
        
            guardarEnStorage(updated);
            cargarProductos();
        } catch(error) {
            generarMensaje("Ocurrió un error al guardar.", "warning");
            console.error(error);
        } finally {
            setEditingProducto(null);
            setIsModalOpen(false);
            setSubmitLoading(false);
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            )}

            <div className="container mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Productos</h1>
                    <p className="text-gray-500">Aquí puedes crear, editar y eliminar los productos de tu tienda.</p>
                </header>

                <div className="flex justify-end space-x-4 mb-8">
                      <Button
                          text="Salir"
                          onClick={() => {
                              navigate('/admin'); 
                          }}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium shadow-md active:scale-95 transition-all"
                      >
                          Salir
                      </Button>
                    
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
                    <div className="bg-white p-6 rounded-xl shadow-lg flex justify-center py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <Section content={pageData} className="" />
                )}
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