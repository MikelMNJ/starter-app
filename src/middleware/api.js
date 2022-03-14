import { actionCreator } from "helpers/stateHelpers";
import { prepPath } from 'helpers/middlewareHelpers.js';

const { REACT_APP_API_BASE_PATH: basePath } = process.env;

const updateReducer = async (type, data) => {
  const action = actionCreator(type, data);

  // TODO: Need middleware for dispatch...
  console.log(action.payload);
};

const apiMiddleware = () => {
  // console.log('Middleware!')
}

export const apiRelay = async args => {
  const { type, path, meta, onSuccess, onFail, onComplete, ...rest } = args;

  try {
    const url = `${basePath || '/'}${prepPath(path || "")}`;
    const res = await fetch(url, { ...rest });
    const data = await res.json();

    if (res.status === 200) {
      updateReducer(type, data);
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