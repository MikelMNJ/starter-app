import { Fragment } from 'react';
import { startsWith, isArray } from 'lodash';
import appSelectors from 'modules/app/appSelectors';
import appActions from 'modules/app/appActions';

export const prepPath = path => {
  if (startsWith(path, '/')) {
    return path.substring(1);
  }

  return path;
};

export const handleNotify = (dispatch, data) => {
  const messages = data?.notification || data?.notifications;
  const errorMessages = data?.error || data?.errors;

  if (messages || errorMessages) {
    const updateNotifications = payload => dispatch(appActions?.updateNotifications(payload));
    const notify = message => updateNotifications([ message ]);
    const msgArr = isArray(messages);
    const errMsgArr = isArray(errorMessages);

    if (msgArr) return messages.forEach(item => notify(item));

    if (errMsgArr) return errorMessages.forEach(item => notify({
      message: item.message || item,
      icon: item.icon,
      type: item.type || "error",
    }));

    if (messages) notify(messages);

    if (errorMessages) notify({
      message: errorMessages.message || errorMessages,
      icon: errorMessages.icon,
      type: errorMessages.type || "error"
    });
  }
};

export const handleOtherResponses = args => {
  const { dispatch, res, path, onFail } = args;
  const { status, statusText } = res;
  const text = `: ${statusText}`
  const notification = {
    message:
      <Fragment>
        <strong>{status}</strong>
        {statusText ? text : ""} ({path})
      </Fragment>,
    type: status < 400 ? "info" : "error",
  };

  if (status >= 400 && onFail) onFail(res);
  handleNotify(dispatch, { notification });
};