// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;

