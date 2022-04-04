import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from 'scenes/Auth/Login';
import NotFound from 'components/NotFound/NotFound';
import DeleteMe from 'scenes/DeleteMe/DeleteMe';

const routes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <p>Create account</p>,
  },
  {
    path: "/reset-password",
    element: <p>Reset password</p>,
  },

  // Remove: examples only...
  {
    path: "/",
    element: <Navigate to="/ready" />,
  },
  {
    path: "/ready",
    element: <DeleteMe />,
    authenticate: true,
  },
  {
    path: "/authenticated-route",
    element: <p>Authenticated Content</p>,
    authenticate: true,
  },
];

export default routes;