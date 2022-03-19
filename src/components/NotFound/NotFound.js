import React from 'react';
import { iconValid } from 'helpers/validators';
import './NotFound.scss';

const NotFound = props => {
  const {
    title,
    noTitle,
    icon,
    noIcon,
    message,
    noMessage,
    staticContext,
    className,
    ...rest
  } = props;

  const renderIcon = () => {
    if (!noIcon) {
      return (
        <div className="icon">
          <i className={`${icon ? iconValid(icon) : "fa-solid fa-bug"}`} />
        </div>
      );
    }
  };

  const renderTitle = () => {
    if (!noTitle) {
      return (
        <h2>
          {title || "404: Hrmm..."}
        </h2>
      );
    }
  };

  const renderMessage = () => {
    if (!noMessage) {
      return (
        <p>
          {message || "Can't find that page."}
        </p>
      );
    }
  };

  return (
    <div className={`notFound ${className || ""}`} {...rest}>
      {renderIcon()}
      {renderTitle()}
      {renderMessage()}
    </div>
  );
};

export default NotFound;