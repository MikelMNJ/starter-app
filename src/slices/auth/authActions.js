/* eslint-disable no-unused-vars */
import { actionCreator } from 'helpers/stateHelpers';
import * as api from './authApi';
import constants from './authConstants';

const authActions = {
  checkToken: (payload, callback) => {
    const args = { type: constants.CHECK_TOKEN, payload, callback };
    return api.checkToken(args);
  },
  createUser: (payload, callback) => {
    const args = { type: constants.CREATE_USER, payload, callback };
    return api.createUser(args);
  },
  updateUser: (payload, callback) => {
    const args = { type: constants.UPDATE_USER, payload, callback };
    return api.updateUser(args);
  },
  deleteUser: (payload, callback) => {
    const args = { type: constants.DELETE_USER, payload, callback };
    return api.deleteUser(args);
  },
  sendResetEmail: (payload, callback) => {
    const args = { type: constants.SEND_RESET_EMAIL, payload, callback };
    return api.sendResetEmail(args);
  },
  login: (payload, callback) => {
    const args = { type: constants.LOG_IN, payload, callback };
    return api.login(args);
  },
};

export default authActions;