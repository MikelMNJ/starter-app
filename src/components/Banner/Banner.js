import React from 'react';
import { iconValid } from 'helpers/validators';
import { buildClasses } from 'helpers/utilityHelpers';
import './Banner.scss';

const Banner = props => {
  const {
    text,
    noClose,
    closeIcon,
    className,
    callback,
    center,
    sharp,
    children,
    ...rest
  } = props;

  const classes = [
    { condition: className, name: className },
    { condition: noClose, name: "noClose" },
    { condition: sharp, name: "sharp" },
  ];

  return (
    <div className={buildClasses(classes, "banner")} {...rest}>
      <div className={`message ${center ? "center" : ""}`}>
        {text || children}
      </div>

      {!noClose && (
        <div className="close">
          <i className={iconValid(closeIcon) || "fa-solid fa-times"} onClick={callback} />
        </div>
      )}
    </div>
  );
};

export default Banner;