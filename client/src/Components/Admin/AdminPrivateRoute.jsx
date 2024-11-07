import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

 
function AdminPrivateRoute() {
        const { isAdmin } = useSelector((state) => state.user);
        return isAdmin ? <Outlet /> : <Navigate to="/admin/signin" />;
}

export default AdminPrivateRoute

