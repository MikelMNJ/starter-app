import { initialState, mainReducer } from 'store';
import { removeToken } from 'helpers/authHelpers';
import constants from './rootConstants';

const { REACT_APP_NAME: appName } = process.env;

const reducer = (state = initialState, action = {}) => {
  switch(action.type) {
    case constants.LOG_OUT:
      const tokenName = `${appName}_token`;
      removeToken(tokenName);
      return { ...initialState };

    default:
      return mainReducer(state, action);
  }
};

export default reducer;