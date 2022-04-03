
const constants = {
  // Actions
  SAMPLE_ACTION: "slices/app/SAMPLE_ACTION",
  ADD_NOTIFICATION: "slices/app/ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "slices/app/REMOVE_NOTIFICATION",
  SET_GLOBAL_BANNER: "slices/app/SET_GLOBAL_BANNER",
  SEND_EMAIL: "slices/app/SEND_EMAIL",
  SAMPLE_API_CALL: "slices/app/SAMPLE_API_CALL",
  TEST_RATE_LIMIT: "slices/app/TEST_RATE_LIMIT",
  LOG_IN: "slices/app/LOG_IN",
  CHECK_TOKEN: "slices/app/CHECK_TOKEN",

  // Selectors
  STATE_KEY_SAMPLE_SELECTOR: "sampleSelector",
  STATE_KEY_NOTIFICATIONS: "notifications",
  STATE_KEY_GLOBAL_BANNER_CONTENT: "globalBannerContent",
  STATE_KEY_EMAIL_RESPONSE: "emailResponse",
  STATE_KEY_SAMPLE_API_RESPONSE: "sampleAPIResponse",
  STATE_KEY_USER_INFO: "userInfo",
  STATE_KEY_TOKEN_NAME: "tokenName",
};

export default constants;