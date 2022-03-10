import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoute from 'components/AuthRoute/AuthRoute';
import NotFound from 'components/NotFound/NotFound';
import Component from 'components/Component/Component';
import './App.scss';

const App = props => {

  const renderApp = () => {
    const hasToken = true;

    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<p>Log in</p>} />
        <Route element={<AuthRoute auth={hasToken} />}>
          <Route path={'/'} element={<Component />} />
        </Route>
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