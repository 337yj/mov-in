import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const AdminPrivateRoute = () => {
    const isAuth = localStorage.getItem("ACCESS_TOKEN") && localStorage.getItem("REFRESH_TOKEN");

    return isAuth ? <Outlet /> : <Navigate to="/auth/adminLogin" />;
}

export default AdminPrivateRoute;