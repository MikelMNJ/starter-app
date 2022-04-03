import constants from './authConstants';

const authSelectors = {
  tokenName: state => state.auth[constants.STATE_KEY_TOKEN_NAME],
  userInfo: state => state.auth[constants.STATE_KEY_USER_INFO],
};

export default authSelectors;