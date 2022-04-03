import { Route } from 'react-router-dom';
import { paramsFromURL } from 'helpers/paramHelpers';
import routes from 'controllers/routesController';
import AuthRoute from 'components/AuthRoute/AuthRoute';

const makeRoutes = (token, redirect) => {
  return routes?.map((route, index) => {
    const { path, element, authenticate } = route;

    const authElement = (
      <AuthRoute
        auth={token}
        redirect={redirect}
        from={{ pathname: path, search: paramsFromURL() }}
      />
    );

    if (authenticate) {
      return (
        <Route key={index} element={authElement}>
          <Route path={path} element={element} />
        </Route>
      );
    }

    return <Route key={index} path={path} element={element} />;
  });
};

export default makeRoutes;