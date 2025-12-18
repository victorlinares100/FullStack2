import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Al cargar la app, recuperamos la sesión
    const storedUser = localStorage.getItem("usuarioLogueado");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al restaurar sesión", error);
        logout();
      }
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData); // userData debe ser { nombre: "...", rol: "..." }
    localStorage.setItem("usuarioLogueado", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

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