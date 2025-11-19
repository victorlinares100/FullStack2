import React from "react";
import { Table } from "react-bootstrap";
import Button from "../atoms/Button"; 

function DynamicTable({ columns, data, emptyMessage, striped = false, hover = false }) {
  const hasActions = columns.includes("Acciones");

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500 py-4">{emptyMessage || "No hay datos para mostrar."}</p>;
  }

  return (
    <div className="table-responsive">
      <Table striped={striped} hover={hover} className="shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((col, index) => {
                const key = col.toLowerCase().replace(/[^a-z0-9]/g, ''); // Para acceder a la propiedad
                
                if (col === "ID") {
                    return <td key={index}>{item.id}</td>;
                }

                if (col === "Acciones" && hasActions) {
                  return (
                    <td key={index}>
                      <div className="d-flex gap-2">
                        {item.onEdit && (
                          <Button 
                            onClick={item.onEdit} 
                            variant="warning" 
                            size="sm"
                            className="me-2" 
                          >
                            Editar
                          </Button>
                        )}
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