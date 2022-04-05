
const constants = {
  // Actions
  CHECK_TOKEN: "slices/auth/CHECK_TOKEN",
  CREATE_USER: "slices/auth/CREATE_USER",
  UPDATE_USER: "slices/auth/UPDATE_USER",
  DELETE_USER: "slices/auth/DELETE_USER",
  SEND_RESET_EMAIL: "slices/auth/SEND_RESET_EMAIL",
  LOG_IN: "slices/auth/LOG_IN",
  LOG_OUT: "slices/auth/LOG_OUT",

  // Selectors
  STATE_KEY_TOKEN_NAME: "tokenName",
  STATE_KEY_USER_INFO: "userInfo",
};

export default constants;