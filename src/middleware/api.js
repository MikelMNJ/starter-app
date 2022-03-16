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

  fetch(url, { ...rest })
    .then(res => res.status < 500 ? res : Promise.reject(Error(res.status)))
    .then(res => {
      if (res.status === 200) {
        dispatch(actionCreator(type, res.json(), meta))
        if (onSuccess) onSuccess(res);
      }
    })
    .catch(e => onFail && onFail(e))
    .finally(() => onComplete && onComplete());

  // try {
  //   const res = await fetch(url, { ...rest });
  //   const data = await res.json();

  //   if (res.status === 200) {
  //     dispatch(actionCreator(type, data, meta))
  //     if (onSuccess) onSuccess(res);
  //   }

  //   return data;
  // } catch (e) {
  //   if (onFail) onFail(e);
  // } finally {
  //   if (onComplete) onComplete();
  // };
};

export default apiMiddleware;