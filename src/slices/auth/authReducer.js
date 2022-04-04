/* eslint-disable no-unused-vars */
import { storeToken } from 'helpers/authHelpers';
import StateManager from 'helpers/stateManager/stateManager';
import constants from './authConstants';

const { REACT_APP_NAME: appName } = process.env;

const initial = {
  [constants.STATE_KEY_TOKEN_NAME]: `${appName}_token`,
};

const reducer = (initialState = initial, action = {}) => {
  const { meta, payload } = action;
  const state = new StateManager(initialState);

  switch(action.type) {
    case constants.CHECK_TOKEN:
      return state.update(constants.STATE_KEY_USER_INFO, payload);
    case constants.CREATE_USER:
      storeToken(state, constants, payload);
      return state.update(constants.STATE_KEY_USER_INFO, payload);
    case constants.DELETE_USER:
      return state.remove(constants.STATE_KEY_USER_INFO);
    case constants.LOG_IN:
      storeToken(state, constants, payload);
      return state.update(constants.STATE_KEY_USER_INFO, payload);

    default:
      return initialState;
  }
};

export default reducer;