import React, { createRef, useEffect, useRef } from 'react';
import { dismiss } from 'helpers/animationHelpers';
import Message from './Message';
import './Notification.scss';

const Notifications = props => {
  const { noIcons, noTime, time, notifications, removeNotification, ...rest } = props;
  const targets = useRef([]);

  useEffect(() => {
    if (!noTime && notifications?.length >= 1) {
      const timer = setTimeout(() => {
        dismiss({
          targets: [ targets.current[0] ],
          onClose: () => removeMessage(0)
        });
        clearTimeout(timer);
      }, time || 4000);

      return () => clearTimeout(timer);
    }

    /* eslint-disable-next-line */
  }, [notifications]);

  function removeMessage(i) {
    if (removeNotification) removeNotification(i);
  };


  const buildNotifications = () => {
    const refs = notifications?.map((msg, i) => (
      targets.current[i] ?? createRef()
    ));

    targets.current = [ ...refs ];

    return notifications?.map((msg, i) => {
      return (
        <Message
          key={i}
          ref={targets.current[i]}
          message={msg}
          noIcons={noIcons}
          args={{ targets: [ targets.current[i] ], onClose: () => removeMessage(i) }}
          {...rest}
        />
      );
    });
  };

  return (
    <div className="notifications">
      {buildNotifications()}
    </div>
  );
};

export default Notifications;