import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute/AuthRoute';
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
    element: <p>Log in</p>,
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

const makeRoutes = (authToken, authPage) => {
  return routes.map((route, index) => {
    const { path, element, authenticate } = route;

    if (authenticate) {
      return (
        <Route key={index} element={<AuthRoute redirect={authPage} auth={authToken} />}>
          <Route path={path} element={element} />
        </Route>
      );
    }

    return <Route key={index} path={path} element={element} />;
  });
};

export default makeRoutes;