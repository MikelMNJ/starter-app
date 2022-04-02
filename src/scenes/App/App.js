import React, { useState, useCallback } from 'react';
import { Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import makeRoutes from 'controllers/routesController';
import Banner from 'components/Banner/Banner';
import Notifications from 'components/Notification/Notifications';
import appSelectors from 'slices/app/appSelectors';
import appActions from 'slices/app/appActions';
import './App.scss';

const App = props => {
  const [ showBanner, setShowBanner ] = useState(true);
  const dispatch = useDispatch();

  // Actions and Selectors
  const removeNotification = useCallback(payload => dispatch(appActions?.removeNotification(payload)), [dispatch]);
  const notifications = useSelector(state => appSelectors?.notifications(state));
  const globalBannerContent = useSelector(state => appSelectors.globalBannerContent(state));

  const renderApp = () => {
    const authToken = true;

    return (
      <Routes>
        {makeRoutes(authToken)}
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