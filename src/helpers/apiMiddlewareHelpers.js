import { startsWith, isArray } from 'lodash';
import appActions from 'slices/app/appActions';

export const prepPath = path => {
  if (startsWith(path, '/')) return path.substring(1);
  return path;
};

export const handleNotify = (dispatch, data) => {
  const messages = data?.message || data?.messages;
  const errorMessages = data?.error || data?.errors;


  if (messages || errorMessages) {
    const addNotification = payload => dispatch(appActions?.addNotification(payload));
    const msgArr = isArray(messages);
    const errMsgArr = isArray(errorMessages);
    const buildNotification = (item, typeFallback) => {
      const { message, msg, icon, type } = item;

      return {
        message: message || msg || item,
        icon,
        type: type || typeFallback,
      }
    };

    if (msgArr) return messages.forEach(item => (
      addNotification(buildNotification(item))
    ));

    if (errMsgArr) return errorMessages.forEach(item => (
      addNotification(buildNotification(item, "error"))
    ));

    if (messages) addNotification(buildNotification(messages));

    if (errorMessages) {
      addNotification(buildNotification(errorMessages, "error"));
    }
  }
};

const handleOtherResponses = args => {
  const { dispatch, res, onFail } = args;
  const { status, statusText } = res;
  const text = `: ${statusText}`
  const message = {
    message: `${status}${statusText ? text : " Response"}.`,
    type: status < 400 ? "info" : "error",
  };

  if (status >= 400 && onFail) onFail(res);
  handleNotify(dispatch, { message });
};

export const handleInitialRes = args => {
  const { res, onSuccess, onFail, dispatch } = args;

  if (res.status === 200 && onSuccess) onSuccess(res);
  if (res.status >= 400) {
    if (res.status !== 429) {
      // 429 notify is being sent from back-end rate limiter, directly.
      const resArgs = { dispatch, res, onFail };
      handleOtherResponses(resArgs);
    }

    if (onFail) onFail(res);
  }

  return res.json();
};