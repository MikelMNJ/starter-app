/* eslint-disable no-unused-vars */
import { isEmpty } from 'lodash';
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
    case constants.LOG_IN:
      if (!isEmpty(payload)) {
        const tokenName = state.get(constants.STATE_KEY_TOKEN_NAME);
        localStorage.setItem(tokenName, payload.token);
      }

      return state.update(constants.STATE_KEY_USER_INFO, payload);

    default:
      return initialState;
  }
};

export default reducer;