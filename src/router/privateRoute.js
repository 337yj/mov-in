import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth =
    localStorage.getItem("ACCESS_TOKEN") &&
    localStorage.getItem("REFRESH_TOKEN");

  return isAuth ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
