import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth =
    localStorage.getItem("ACCESS_TOKEN") &&
    localStorage.getItem("REFRESH_TOKEN");

  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
