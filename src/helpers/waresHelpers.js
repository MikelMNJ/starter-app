import { startsWith } from 'lodash';
import appSelectors from 'modules/app/appSelectors';
import appActions from 'modules/app/appActions';

export const prepPath = path => {
  if (startsWith(path, '/')) {
    return path.substring(1);
  }

  return path;
};

export const handleNotify = (dispatch, state, notification) => {
  if (notification) {
    const updateNotifications = payload => dispatch(appActions?.updateNotifications(payload));
    const notifications = appSelectors?.notifications(state);
    const notify = message => updateNotifications([ ...notifications, message ]);
    const errors = notification.errors;

    if (errors) {
      errors.forEach(error => notify({
        message: error, type: "error"
      }));

      return;
    }

    notify(notification);
  }
};

export const handleOtherResponses = (dispatch, state, res, path) => {
  // Handles 300-500 response codes.
  const { status, statusText } = res;
  const text = `: ${statusText}`
  const notification = {
    message: `${status}${statusText ? text : ""} (${path})`,
    type: status < 400 ? "info" : "error",
  };

  handleNotify(dispatch, state, notification);
};