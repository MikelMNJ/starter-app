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

export const logout = tokenName => {
  const existingToken = localStorage.getItem(tokenName);

  if (existingToken) {
    // TODO: Rest all reducers...
    localStorage.removeItem(tokenName);
    console.log("Logging out...");
  }

  clearInterval(sessionCheck);
};

export const autoLogout = (token, tokenName) => {
  if (token && !sessionCheck) {
    sessionCheck = setInterval(() => {
      const expires = moment(jwt_decode(token).exp * 1000);
      const expired = moment() > expires;
      if (expired) logout(tokenName);
    }, 60000)
  }
};