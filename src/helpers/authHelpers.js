import { isEmpty } from 'lodash';

export const storeToken = (state, constants, payload) => {
  if (!isEmpty(payload)) {
    const tokenName = state.get(constants.STATE_KEY_TOKEN_NAME);
    localStorage.setItem(tokenName, payload.token);
  }
};