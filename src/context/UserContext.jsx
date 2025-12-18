import React, { createContext, useState, useContext, useEffect } from 'react';

// Creación del contexto
const UserContext = createContext();

// Hook personalizado para usar el contexto de manera sencilla
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Efecto para cargar la sesión al iniciar la aplicación
  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioLogueado");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al procesar el usuario desde localStorage", error);
        // Si hay un error, limpiamos los datos corruptos
        localStorage.removeItem("usuarioLogueado");
        localStorage.removeItem("token");
      }
    }
  }, []);

  /**
   * Función para iniciar sesión globalmente
   * @param {Object} userData - Objeto con nombre, rol, etc.
   * @param {String} token - Token JWT generado por el backend
   */
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("usuarioLogueado", JSON.stringify(userData));
    localStorage.setItem("token", token); // Guardamos el token para el interceptor de Axios
  };

  /**
   * Función para cerrar la sesión
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};