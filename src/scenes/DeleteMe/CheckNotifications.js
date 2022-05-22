import React, { Fragment, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import Status from 'components/Status/Status';
import appSelectors from 'modules/app/appSelectors';
import appActions from 'modules/app/appActions';
import colors from 'theme/colors.scss';

export const CheckNotifications = props => {
  const dispatch = useDispatch();

  // Actions and Selectors
  const addNotifications = useCallback(payload => dispatch(appActions?.addNotification(payload)), [dispatch]);
  const notifications = useSelector(state => appSelectors?.notifications(state));

  useEffect(() => {
    const newMessage = {
      message: "Notification system ready.",
      icon: "fa-regular fa-message",
    };

    addNotifications(newMessage);
    /* eslint-disable-next-line */
  }, []);

  return (
    <Fragment>
      <Status color={notifications ? colors.green : colors.red} text={
        <p>
          <strong>
            Notifications {notifications ? "ready" : "offline"}
          </strong>:<br />

          Message {notifications ? "received" : "receive failed"}.
        </p>
      } />
    </Fragment>
  );
};

export default CheckNotifications;