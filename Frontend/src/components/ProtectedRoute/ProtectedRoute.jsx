import React from "react";
import { Redirect } from "react-router-dom";
import { getAdminSession, isAdminAuthenticated } from "../../Services/auth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = getAdminSession()?.user || null;
  const isAuthenticated = isAdminAuthenticated();
  const userRole = user?.role;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // If authenticated but role not allowed, redirect to home
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Redirect to="/" />;
  }

  // If authenticated and role is allowed, render children
  return children;
};

export default ProtectedRoute;
