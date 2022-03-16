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

export const apiRelay = async args => {
  const { type, path, meta, onSuccess, onFail, onComplete, dispatch, ...rest } = args;

  const options = {
    ...rest,
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      ...rest.headers,
    },
  };

  try {
    const url = `/.netlify/functions/server/${prepPath(path) || ""}`;
    const res = await fetch(url, options);
    const data = await res.json();

    if (res.status === 200) {
      dispatch(actionCreator(type, data, meta))
      if (onSuccess) onSuccess(res);
    }

    return data;
  } catch (e) {
    if (onFail) onFail(e);
  } finally {
    if (onComplete) onComplete();
  };
};

export default apiMiddleware;