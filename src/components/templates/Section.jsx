import React from 'react';
import Text from '../atoms/Text';
import DynamicTable from '../organisms/DynamicTable';

function Section({ content, className }) {
    return (
        <div className={`space-y-10 ${className}`}>
            {content.map((item, index) => (
                <div key={index} className="w-full">
                    {item.title && (
                        <div className="mb-6 flex items-center justify-between">
                            <Text variant="h2" className="text-2xl font-bold text-slate-800 tracking-tight">
                                {item.title}
                            </Text>
                        </div>
                    )}

                    {item.type === 'table' && item.data && (
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <DynamicTable
                                    columns={item.columns}
                                    data={item.data}
                                    className="w-full"
                                    emptyMessage={
                                        <div className="p-12 text-center text-slate-500">
                                            {item.emptyMessage || "No hay datos disponibles."}
                                        </div>
                                    }
                                    renderCell={(row, column) => {
                                        if (column === "Logo") {
                                            return row.Logo !== "Sin imagen" ? (
                                                <div className="w-12 h-12 rounded-lg border border-slate-100 overflow-hidden bg-slate-50 p-1">
                                                    <img
                                                        src={row.Logo}
                                                        className="w-full h-full object-cover rounded-md"
                                                        alt="Producto"
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400 italic">N/A</span>
                                            );
                                        }
                                        if (column === "Precio") {
                                            return <span className="font-semibold text-emerald-600">{row[column]}</span>;
                                        }
                                        if (column === "Stock") {
                                            return (
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${row[column] > 0 ? 'bg-blue-50 text-blue-700' : 'bg-red-50 text-red-700'}`}>
                                                    {row[column]} u.
                                                </span>
                                            );
                                        }
                                        return <span className="text-sm text-slate-600">{row[column]}</span>;
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Section;