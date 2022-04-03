import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoute = props => {
  const { auth, redirect, from } = props;
  const pathname = redirect || "/login";
  const state = { from };

  return auth
    ? <Outlet />
    : <Navigate to={pathname} state={state} />;
};

export default AuthRoute;