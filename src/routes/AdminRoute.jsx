// src/routes/AdminRoute.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ component: Component, roles, ...rest }) => {
  const { token } = useSelector((state) => state.auth);
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    if (!token) {
      setAllowed(false);
    } else if (roles.includes(token.role)) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, [token, roles]);

  if (allowed === null) {
    return null; // or some loading spinner
  }

  return allowed ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AdminRoute;
