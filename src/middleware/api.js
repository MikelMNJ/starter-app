import { prepPath } from 'helpers/middlewareHelpers.js';
import { actionCreator } from 'helpers/stateHelpers';

const { REACT_APP_API_BASE_PATH: basePath } = process.env;

const apiMiddleware = (dispatch, action) => {
  const isAPIRequest = action.path || action.method;
  // console.log(action);

  if (isAPIRequest) {
    apiRelay({ ...action, dispatch });
    return;
  }

  return action;
};

export const apiRelay = async args => {
  const { type, path, meta, onSuccess, onFail, onComplete, dispatch, ...rest } = args;

  try {
    const url = `${basePath || '/'}${prepPath(path || "")}`;
    const res = await fetch(url, { ...rest });
    const data = await res.json();

    if (res.status === 200) {
      dispatch(actionCreator(type, data))
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