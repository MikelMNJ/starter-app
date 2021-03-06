import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from 'scenes/Auth/Login';
import CreateAccount from 'scenes/Auth/CreateAccount';
import ResetPassword from 'scenes/Auth/ResetPassword';
import SetPassword from 'scenes/Auth/SetPassword';
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
    element: <CreateAccount />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/set-password",
    element: <SetPassword />,
  },

  // Remove: examples only...
  {
    path: "/",
    element: <Navigate to="/ready" />,
  },
  {
    path: "/ready",
    element: <DeleteMe />,
  },
  {
    path: "/authenticated-route",
    element: <p>Authenticated Content</p>,
    authenticate: true,
  },
];

export default routes;