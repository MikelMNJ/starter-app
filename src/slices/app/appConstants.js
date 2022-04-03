
const constants = {
  // Actions
  ADD_NOTIFICATION: "slices/app/ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "slices/app/REMOVE_NOTIFICATION",
  SET_GLOBAL_BANNER: "slices/app/SET_GLOBAL_BANNER",
  SEND_EMAIL: "slices/app/SEND_EMAIL",
  TEST_RATE_LIMIT: "slices/app/TEST_RATE_LIMIT",

  // Selectors
  STATE_KEY_NOTIFICATIONS: "notifications",
  STATE_KEY_GLOBAL_BANNER_CONTENT: "globalBannerContent",
  STATE_KEY_EMAIL_RESPONSE: "emailResponse",

  // Remove: example only...
  SAMPLE_ACTION: "slices/app/SAMPLE_ACTION",
  SAMPLE_API_CALL: "slices/app/SAMPLE_API_CALL",
  STATE_KEY_SAMPLE_SELECTOR: "sampleSelector",
  STATE_KEY_SAMPLE_API_RESPONSE: "sampleAPIResponse",
};

export default constants;