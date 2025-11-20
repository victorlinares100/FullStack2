export const productsData = [
  {
    type: "text",
    text: [
      {
        id: 1,
        content: "Gestión de Productos",
        variant: "h1",
        className: "text-4xl font-bold text-center"
      },
      {
        id: 2,
        content: "Aquí puedes crear, editar y eliminar los productos de tu tienda.",
        variant: "p",
        className: "text-lg text-gray-600 text-center mt-2"
      }
    ]
  },
  {
    type: "table",
    title: "Productos Activos",
    columns: ["ID", "Nombre", "Precio", "Logo", "Acciones"],
    data: [],
    service: "productos",
    className: "my-8"
  }
];
