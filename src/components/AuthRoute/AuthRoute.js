import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoute = props => {
  const { auth, redirect } = props;
  return auth ? <Outlet /> : <Navigate to={redirect || "/login"} />;
};

export default AuthRoute;