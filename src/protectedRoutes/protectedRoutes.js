import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
   const authState = useSelector((state) => state.auth);

   if (!authState.isAuthenticated) {
      return <Navigate to="/" />;
   }

   return children ? children : <Outlet />;
};

export default ProtectedRoute;
