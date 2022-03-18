import { prepPath, handleNotify, handleOtherResponses } from 'helpers/apiMiddlewareHelpers';
import { actionCreator } from 'helpers/stateHelpers';

const apiMiddleware = (dispatch, action, state) => {
  const isAPIRequest = action.path || action.method;

  if (isAPIRequest) {
    apiRelay({ ...action, dispatch, state });
    return;
  }

  dispatch(action);
};

export const apiRelay = args => {
  const { REACT_APP_API_BASE_PATH: basePath } = process.env;
  const { type, path, meta, onSuccess, onFail, onComplete, dispatch, state, ...rest } = args;
  const url = `${basePath}${prepPath(path) || ""}`;
  const options = { ...rest };

  // Netlify has an issue with try/catch, async/await -- using promise chains for now...
  fetch(url, options)
    .then(res => {
      if (res.status === 200 && onSuccess) onSuccess(res);
      if (res.status >= 400) {
        const resArgs = { dispatch, res, onFail };
        handleOtherResponses(resArgs);
      }

      return res.json();
    })
    .then(data => {
      if (data) {
        const { message, messages, error, errors, ...payload } = data;
        handleNotify(dispatch, data);

        if (payload && (!error || !errors)) {
          dispatch(actionCreator(type, payload, meta));
        }
      }
    })
    .catch(res => {
      handleNotify(dispatch, res);
    })
    .finally(() => onComplete && onComplete());
};

export default apiMiddleware;