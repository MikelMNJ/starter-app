import { prepPath, handleNotify, handleOtherResponses } from 'helpers/waresHelpers';
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
      if (res.status >= 500) Promise.reject(Error(res));
      if (res.status === 200) {
        if (onSuccess) onSuccess(res);
        return res.json();
      }

      return res;
    })
    .then(res => {
      if (res.status) return handleOtherResponses(dispatch, state, res, path);
      handleNotify(dispatch, state, res?.notification);
      dispatch(actionCreator(type, res, meta));
    })
    .catch(res => {
      if (onFail) onFail(res)
    })
    .finally(() => onComplete && onComplete());
};

export default apiMiddleware;