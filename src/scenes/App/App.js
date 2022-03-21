import React, { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import Banner from 'components/Banner/Banner';
import AuthRoute from 'components/AuthRoute/AuthRoute';
import NotFound from 'components/NotFound/NotFound';
import DeleteMe from 'scenes/DeleteMe/DeleteMe';
import Notifications from 'components/Notification/Notifications';
import appSelectors from 'modules/app/appSelectors';
import appActions from 'modules/app/appActions';
import './App.scss';

const App = props => {
  const [ showBanner, setShowBanner ] = useState(true);
  const dispatch = useDispatch();

  // Actions and Selectors
  const removeNotification = useCallback(payload => dispatch(appActions?.removeNotification(payload)), [dispatch]);
  const notifications = useSelector(state => appSelectors?.notifications(state));
  const globalBannerContent = useSelector(state => appSelectors.globalBannerContent(state));

  const renderApp = () => {
    const tokenFromState = true;

    return (
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<p>Log in</p>} />
        <Route path="/ready" element={<DeleteMe />} />

        {/* Authenticated route example */}
        <Route element={<AuthRoute auth={tokenFromState} />}>
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
      {globalBannerContent && showBanner && (
        <Banner center text={globalBannerContent} callback={() => setShowBanner(false)} />
      )}

      {renderApp()}

      <Notifications
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
};

export default App;