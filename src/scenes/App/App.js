import React, { useState, useEffect, useCallback } from 'react';
import { Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import makeRoutes from 'helpers/routeHelpers';
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
  const checkToken = useCallback(payload => dispatch(appActions?.checkToken(payload)), [dispatch]);
  const notifications = useSelector(state => appSelectors?.notifications(state));
  const globalBannerContent = useSelector(state => appSelectors.globalBannerContent(state));
  const userInfo = useSelector(state => appSelectors.userInfo(state));
  const tokenName = useSelector(state => appSelectors.tokenName(state));
  const token = userInfo?.token;

  useEffect(() => {
    const existingToken = localStorage.getItem(tokenName);
    const payload = { token: existingToken };
    if (existingToken) checkToken(payload);
    /* eslint-disable-next-line */
  }, []);

  return (
    <div id="app">
      <Routes>
        {makeRoutes(token)}
      </Routes>

      {globalBannerContent && showBanner && (
        <Banner center text={globalBannerContent} callback={() => setShowBanner(false)} />
      )}

      <Notifications
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
};

export default App;