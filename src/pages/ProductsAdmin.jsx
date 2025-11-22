import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/templates/Section";
import Button from "../components/atoms/Button";
import productoService from "../services/productoService";
import { generarMensaje } from "../utils/GenerarMensaje";
import CreateModalProductos from "../components/organisms/CreateModalProductos";

const productColumns = ["ID", "Nombre", "Precio", "Stock", "Categoría", "Marca", "Talla", "Logo", "Acciones"];

function ProductsAdmin() {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState([{ title: "Productos", service: "productos", columns: productColumns, data: [] }]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editingProducto, setEditingProducto] = useState(null);

  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [tallas, setTallas] = useState([]);

  useEffect(() => {
    loadProductos();
    loadOptions();
  }, []);

  const loadOptions = async () => {
        try {
        const [cat, mar, tall] = await Promise.all([
            productoService.getCategorias(),
            productoService.getMarcas(),
            productoService.getTallas(),
        ]);
        setCategorias(cat);
        setMarcas(mar);
        setTallas(tall);
        } catch (error) {
        console.error("Error al cargar opciones:", error);
        }
    };

    const loadProductos = async () => {
        setLoading(true);
        try {
            const data = await productoService.getAll();

            console.log("Productos desde backend:", data); // Para depuración

            const dataWithActions = data.map((p) => ({
                id: p.id,
                Nombre: p.nombreProducto,
                Precio: `$${parseFloat(p.precioProducto).toFixed(2)}`,
                Stock: p.stock,
                Categoría: p.categoria?.tipoCategoria || "",
                Marca: p.marca?.nombreMarca || "",
                Talla: p.talla?.tipoTalla || "",
                Logo: p.imagen?.url ? (
                <div style={{ width: 64, height: 64, overflow: "hidden", borderRadius: 8 }}>
                    <img
                    src={p.imagen.url}
                    alt={p.nombreProducto}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                ) : "Sin imagen",


                onEdit: () => openEdit(p),
                onDelete: () => handleDelete(p.id),
                categoriaId: p.categoria?.id || "",
                marcaId: p.marca?.id || "",
                tallaId: p.talla?.id || "",
            }));

            setPageData([{
                title: "Productos",
                service: "productos",
                type: "table", // Importante para que Section renderice la tabla
                columns: productColumns,
                data: dataWithActions,
            }]);
        } catch (error) {
            generarMensaje("Error al cargar productos", "warning");
            console.error(error);
        }
        setLoading(false);
    };




  const openEdit = (producto) => {
    setEditingProducto(producto);
    setIsModalOpen(true);
  };

  const handleCreateOrUpdate = async (formData) => {
    setSubmitLoading(true);
    try {
      const dto = {
        nombre: formData.nombre,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        categoria: formData.categoria || null,
        marca: formData.marca || null,
        talla: formData.talla || null,
        imagen: formData.imagen || null,
      };

      if (editingProducto?.id) {
        await productoService.update(editingProducto.id, dto);
        generarMensaje("Producto actualizado con éxito!", "success");
      } else {
        await productoService.create(dto);
        generarMensaje("Producto creado con éxito!", "success");
      }

      await loadProductos();
      setEditingProducto(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar producto:", error.response?.data || error.message);
      generarMensaje("Error al guardar producto", "warning");
    }
    setSubmitLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Quieres eliminar este producto?")) return;
    try {
      await productoService.remove(id);
      generarMensaje("Producto eliminado!", "success");
      await loadProductos();
    } catch (error) {
      generarMensaje("Error al eliminar", "warning");
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
          <p className="text-gray-500">Crear, editar y eliminar productos desde tu base de datos.</p>
        </header>

        <div className="flex justify-end mb-8 space-x-4">
          <Button text="Salir" onClick={() => navigate("/admin")} className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md" />
          <Button text="Crear Producto" onClick={() => { setEditingProducto(null); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md" />
        </div>

        <Section content={pageData} />
      </div>

      <CreateModalProductos
        isOpen={isModalOpen}
        onClose={() => { setEditingProducto(null); setIsModalOpen(false); }}
        onSubmit={handleCreateOrUpdate}
        inputsConfig={[
          { name: "nombre", type: "text", placeholder: "Nombre", required: true },
          { name: "precio", type: "number", placeholder: "Precio", required: true },
          { name: "stock", type: "number", placeholder: "Stock", required: true },
          { name: "categoria", type: "select", placeholder: "Categoría", required: true, options: categorias },
          { name: "marca", type: "select", placeholder: "Marca", required: true, options: marcas },
          { name: "talla", type: "select", placeholder: "Talla", required: true, options: tallas },
          { name: "imagen", type: "file", placeholder: "Imagen" },
        ]}
        title={editingProducto ? "Editar Producto" : "Crear Producto"}
        submitText={editingProducto ? "Actualizar" : "Crear"}
        loading={submitLoading}
        initialData={editingProducto || {}}
      />
    </div>
  );
}

export default ProductsAdmin;
