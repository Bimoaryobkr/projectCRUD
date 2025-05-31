import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../local/authLocal";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoadingAuth } = useAuth();

    if (isLoadingAuth) {
        return <p>Loading authentication...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
