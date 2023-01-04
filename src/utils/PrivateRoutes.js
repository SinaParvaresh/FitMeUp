import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../components/store/auth-context";

const PrivateRoutes = () => {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
