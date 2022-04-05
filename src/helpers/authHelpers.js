import { isEmpty } from 'lodash';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

export let sessionCheck;

export const storeToken = (state, constants, payload) => {
  if (!isEmpty(payload)) {
    const tokenName = state.get(constants.STATE_KEY_TOKEN_NAME);
    localStorage.setItem(tokenName, payload.token);
  }
};

export const removeToken = tokenName => {
  const existingToken = localStorage.getItem(tokenName);
  if (existingToken) {
    localStorage.removeItem(tokenName);
  }
};

export const autoLogout = (token, callback) => {
  if (token && !sessionCheck) {
    sessionCheck = setInterval(() => {
      const expires = moment(jwt_decode(token).exp * 1000);
      const expired = moment() > expires;
      if (expired) {
        clearInterval(sessionCheck);
        callback();
      }
    }, 1000)
  }
};