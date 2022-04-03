import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from 'scenes/Login/Login';
import NotFound from 'components/NotFound/NotFound';
import DeleteMe from 'scenes/DeleteMe/DeleteMe';

const routes = [
  {
    // 404 Example
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
  {
    path: "/ready",
    element: <DeleteMe />,
  },
  {
    // Private route example
    path: "/authenticated-route",
    element: <p>Authenticated Content</p>,
    authenticate: true,
  },
  {
    // Redirect example
    path: "/",
    element: <Navigate to="/ready" />,
  },
];

export default routes;