// src/components/organisms/DynamicTable.jsx
import React from "react";
import { Table } from "react-bootstrap";
import Button from "../atoms/Button"; // Usas tu átomo Button

function DynamicTable({ columns, data, emptyMessage, striped = false, hover = false }) {
  // Encuentra si 'Acciones' es una de las columnas
  const hasActions = columns.includes("Acciones");

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-4">{emptyMessage || "No hay datos para mostrar."}</p>;
  }

  return (
    <div className="table-responsive">
      <Table striped={striped} hover={hover} className="shadow-sm rounded-lg overflow-hidden">
        {/* Cabecera de la tabla */}
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        
        {/* Cuerpo de la tabla */}
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col, index) => {
                const key = col.toLowerCase().replace(/[^a-z0-9]/g, ''); // Para acceder a la propiedad
                
                // Manejar la columna 'ID' (que siempre debe estar)
                if (col === "ID") {
                    return <td key={index}>{item.id}</td>;
                }

                // Manejar la columna 'Acciones'
                if (col === "Acciones" && hasActions) {
                  return (
                    <td key={index}>
                      <div className="d-flex gap-2">
                        {/* Botón de Edición */}
                        {item.onEdit && (
                          <Button 
                            onClick={item.onEdit} 
                            variant="warning" 
                            size="sm"
                            className="me-2" // Agregado para espaciar
                          >
                            Editar
                          </Button>
                        )}
                        {/* Botón de Eliminación */}
                        {item.onDelete && (
                          <Button 
                            onClick={item.onDelete} 
                            variant="danger" 
                            size="sm"
                          >
                            Eliminar
                          </Button>
                        )}
                      </div>
                    </td>
                  );
                }
                
                // Renderizar otras columnas (asumiendo que las claves en 'item' son 'Nombre' y 'Precio' como en tu mapeo)
                // Se busca la propiedad en el objeto, usando la clave de la columna (ej: 'Nombre' -> item.Nombre)
                return <td key={index}>{item[col]}</td>; 
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DynamicTable;