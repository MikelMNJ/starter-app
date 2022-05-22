/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import { autoLogout, sessionCheck } from 'helpers/authHelpers';
import makeRoutes from 'helpers/routeHelpers';
import Banner from 'components/Banner/Banner';
import Notifications from 'components/Notification/Notifications';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import authActions from 'modules/auth/authActions';
import rootActions from 'modules/root/rootActions';
import authSelectors from 'modules/auth/authSelectors';
import './App.scss';

const App = props => {
  const [ showBanner, setShowBanner ] = useState(true);
  const dispatch = useDispatch();

  // Actions and Selectors
  const removeNotification = useCallback(payload => dispatch(appActions?.removeNotification(payload)), [dispatch]);
  const checkToken = useCallback(payload => dispatch(authActions?.checkToken(payload)), [dispatch]);
  const logout = useCallback(() => dispatch(rootActions?.logout()), [dispatch]);
  const notifications = useSelector(state => appSelectors?.notifications(state));
  const globalBannerContent = useSelector(state => appSelectors.globalBannerContent(state));
  const userInfo = useSelector(state => authSelectors.userInfo(state));
  const tokenName = useSelector(state => authSelectors.tokenName(state));
  const token = userInfo?.token;

  useEffect(() => {
    const existingToken = localStorage.getItem(tokenName);
    const payload = { token: existingToken };
    if (existingToken) checkToken(payload);
  }, []);

  useEffect(() => {
    autoLogout(token, () => logout());
    return () => clearInterval(sessionCheck);
  }, [token]);

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