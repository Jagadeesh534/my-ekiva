import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
// const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
const isLoggedIn = true;
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
