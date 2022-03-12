import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute/AuthRoute';
import NotFound from 'components/NotFound/NotFound';
import ReplaceMe from 'components/ReplaceMe/ReplaceMe';
import './App.scss';

const App = props => {

  const renderApp = () => {
    const hasToken = true;

    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<p>Log in</p>} />
        <Route path="/ready" element={<ReplaceMe apiTestPath="/test" />} />

        {/* Authenticated route example */}
        <Route element={<AuthRoute auth={hasToken} />}>
          <Route
            path="/authenticated-route"
            element={<p>Authenticated Content</p>}
          />
        </Route>

        {/* Redirect example */}
        <Route path="/" element={<Navigate to="/ready" />} />
      </Routes>
    );
  };

  return (
    <div id="app">
      {renderApp()}
    </div>
  );
};

export default App;