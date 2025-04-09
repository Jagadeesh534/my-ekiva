import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
    debugger
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated); // or check token

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
