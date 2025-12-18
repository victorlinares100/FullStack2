import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const ProtectedRoute = () => {
    const { user } = useUser();

    // Si no hay usuario o el rol no es ADMIN, redirige al login o al home
    if (!user || user.rol?.toUpperCase() !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    // Si es admin, permite el acceso a las rutas hijas (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;