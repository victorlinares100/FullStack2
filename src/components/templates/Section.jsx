// src/components/templates/Section.jsx
import React from 'react';
import Text from '../atoms/Text'; // Para los títulos
import DynamicTable from '../organisms/DynamicTable'; // Para la tabla

function Section({ content, className }) {
    return (
        <div className={className}>
            {content.map((item, index) => (
                <div key={index} className="mb-8">
                    {/* Renderiza títulos si existen */}
                    {item.title && (
                        <Text variant="h2" className="text-2xl font-bold text-gray-800 mb-4">
                            {item.title}
                        </Text>
                    )}

                    {/* Renderiza la tabla solo si type === 'table' */}
                    {item.type === 'table' && item.data && (
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <DynamicTable
                                columns={item.columns}
                                data={item.data}
                                striped={true}
                                hover={true}
                                emptyMessage={item.emptyMessage || "No hay datos."}
                                // Renderizado especial para Logo
                                renderCell={(row, column) => {
                                    if (column === "Logo") {
                                        return row.Logo !== "Sin imagen" ? (
                                            <img
                                                src={row.Logo}
                                                className="w-12 h-12 object-cover rounded"
                                                alt="Producto"
                                            />
                                        ) : "Sin imagen";
                                    }
                                    return row[column];
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Section;
