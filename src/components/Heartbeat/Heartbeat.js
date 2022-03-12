import React, { Fragment, useState, useEffect } from 'react';
import { iconValid } from 'helpers/validators';
import { buildClasses } from 'helpers/utilityHelpers';

const Heartbeat = props => {
  const { time, icon, text, disabled, children, className, ...rest } = props;
  const [ offline, setOffline ] = useState(false);

  const classes = [
    { condition: className, name: className },
  ];

  useEffect(() => {
    const heartbeat = setInterval(async () => {
      if (!disabled) {
        try {
          const res = await fetch('https://icanhazip.com');
          const data = await res.data;

          if (offline) setOffline(false);
          return data;
        } catch (e) {
          if (!offline) setOffline(true);
        }
      }
    }, time || 10000);

    return () => clearInterval(heartbeat);
  }, [offline]);

  const offlineContent = () => {
    return (
      <div className={buildClasses(classes, "flatline")} {...rest}>
        <i className={iconValid(icon) || "fa-solid fa-ethernet"} />
        <p>{text || "No connection detected."}</p>
      </div>
    );
  };

  return (
    <Fragment>
      {offline ? offlineContent() : children}
    </Fragment>
  );
};

export default Heartbeat;