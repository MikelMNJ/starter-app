import React, { forwardRef } from "react";
import { iconValid } from 'helpers/validators';
import { dismiss, slideIn } from 'helpers/animationHelpers';
import { buildClasses } from 'helpers/utilityHelpers';
import { isObject, isArray, lowerCase } from 'lodash';
import './Notification.scss';

const defaultIcon = "fa-solid fa-info-circle";
const defaultSuccess = "fa-solid fa-circle-check";
const defaultWarning = "fa-solid fa-triangle-exclamation";
const defaultError = "fa-solid fa-circle-exclamation";

const Message = forwardRef((props, ref) => {
  const { message, noIcons, className, args, ...rest } = props;

  const classes = [
    { condition: className, name: className },
    { condition: noIcons, name: "noIcons" },
    { condition: lowerCase(message.type) === "success", name: "success" },
    { condition: lowerCase(message.type) === "warning", name: "warning" },
    { condition: lowerCase(message.type) === "error", name: "error" },
  ];

  const buildMessage = () => {
    if (isObject(message) && !isArray(message)) {
      return message.message || message.msg;
    }

    return message;
  };

  const getDefaultIcon = () => {
    if (message.type) {
      const { type } = message;
      if (lowerCase(type) === "success") return defaultSuccess;
      if (lowerCase(type) === "warning") return defaultWarning;
      if (lowerCase(type) === "error") return defaultError;
    }

    return defaultIcon;
  };

  return (
    <div
      ref={ref}
      className={buildClasses(classes, `notification ${slideIn}`)}
      {...rest}
    >
      {!noIcons && (
        <div className="icon">
          <i className={iconValid(message.icon) || getDefaultIcon()} />
        </div>
      )}

      <div className="message">
        {buildMessage()}
      </div>

      <div className="close" onClick={() => dismiss(args)}>
        <i className="fa-solid fa-times" />
      </div>
    </div>
  );
});

export default Message;