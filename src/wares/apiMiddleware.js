import { prepPath, handleNotify, handleInitialRes } from 'helpers/apiMiddlewareHelpers';
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
  const { REACT_APP_API_V1: basePath } = process.env;
  const { type, path, meta, onSuccess, onFail, onComplete, dispatch, state, ...rest } = args;
  const url = `${basePath}${prepPath(path) || ""}`;
  const options = { ...rest };

  // Netlify has an issue with try/catch, async/await -- using promise chains for now...
  fetch(url, options)
    .then(res => handleInitialRes({ res, onSuccess, onFail, dispatch }))
    .then(data => {
      if (data) {
        const { message, messages, error, errors, ...payload } = data;
        handleNotify(dispatch, data);

        if (payload && (!error || !errors)) {
          dispatch(actionCreator(type, payload, meta));
        }
      }
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => onComplete && onComplete());
};

export default apiMiddleware;