
const CART_STORAGE_KEY = 'aurea_shopping_cart';

// Función auxiliar para obtener el carrito del localStorage
export const getCartItems = () => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    // Si no hay ítems o está vacío, devuelve un array vacío
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error("Error al cargar el carrito:", err);
    return [];
  }
};

// Función auxiliar para guardar el carrito en el localStorage
const saveCartItems = (items) => {
  try {
    const serializedState = JSON.stringify(items);
    localStorage.setItem(CART_STORAGE_KEY, serializedState);
  } catch (err) {
    console.error("Error al guardar el carrito:", err);
  }
};


export const addProductToCart = (product) => {
  const currentItems = getCartItems();
  
  const existingItem = currentItems.find(item => item.id === product.id);
  
  let newItems;
  
  if (existingItem) {
    // Si existe, incrementa la cantidad
    newItems = currentItems.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    // Si es nuevo, agrégalo con cantidad 1
    newItems = [...currentItems, { ...product, quantity: 1 }];
  }
  
  saveCartItems(newItems);
  return newItems; // Devuelve los nuevos ítems
};

// Remueve un producto completamente (o puedes modificar para decrementar cantidad)
export const removeProductFromCart = (productId) => {
  const currentItems = getCartItems();
  const newItems = currentItems.filter(item => item.id !== productId);
  
  saveCartItems(newItems);
  return newItems;
};

// Calcula el total de la compra
export const calculateTotal = (items) => {
  return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

// Vacía el carrito
export const clearAllCart = () => {
    saveCartItems([]);
    return [];
};