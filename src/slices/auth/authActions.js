/* eslint-disable no-unused-vars */
import { actionCreator } from 'helpers/stateHelpers';
import * as api from './authApi';
import constants from './authConstants';

const authActions = {
  checkToken: (payload, callback) => {
    const args = { type: constants.CHECK_TOKEN, payload, callback };
    return api.checkToken(args);
  },
  login: (payload, callback) => {
    const args = { type: constants.LOG_IN, payload, callback };
    return api.login(args);
  },
};

export default authActions;