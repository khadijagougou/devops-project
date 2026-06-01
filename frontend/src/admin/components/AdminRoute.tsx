import {Navigate, Outlet} from "react-router-dom";

export const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role !== "ADMIN") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};