import React from 'react';
import { Navigate } from 'react-router-dom';

 /**
+  * Wrap any routes/components you want to guard in <ProtectedRoute>…</ProtectedRoute>.
+  * If a token exists in localStorage it renders its children, otherwise redirects.
+  */
 const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token
    ? children
    : <Navigate to="/login" replace />;
};
export default ProtectedRoute;