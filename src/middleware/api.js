import { prepPath } from 'helpers/middlewareHelpers.js';
import { actionCreator } from 'helpers/stateHelpers';

const apiMiddleware = (dispatch, action) => {
  const isAPIRequest = action.path || action.method;

  if (isAPIRequest) {
    apiRelay({ ...action, dispatch });
    return;
  }

  dispatch(action);
};

export const apiRelay = args => {
  const { type, path, meta, onSuccess, onFail, onComplete, dispatch, ...rest } = args;
  const url = `/.netlify/functions/server/${prepPath(path) || ""}`;
  const options = { ...rest };

  // Netlify has an issue with try/catch, async/await -- using promise chains for now...
  fetch(url, options)
    .then(res => {
      if (res.status >= 500) Promise.reject(Error(res.status));
      if (res.status === 200 && onSuccess) onSuccess(res);
      return res.json();
    })
    .then(data => {
      dispatch(actionCreator(type, data, meta));
    })
    .catch(e => onFail && onFail(e))
    .finally(() => onComplete && onComplete());
};

export default apiMiddleware;