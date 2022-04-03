import { actionCreator } from 'helpers/stateHelpers';
/* eslint-disable-next-line */
import * as api from './appApi';
import constants from './appConstants';

/*
* How to use: In component, import and declare variable from state.
* import { useDispatch } from 'helpers/stateHelpers';
* import appActions from 'slices/app/appActions';
*
* const dispatch = useDispatch();
* const setSample = payload => dispatch(appActions.sampleAction(payload));
* setSample("Sample payload.");
*/

const appActions = {
  sampleAction: payload => actionCreator(constants.SAMPLE_ACTION, payload),
  addNotification: payload => actionCreator(constants.ADD_NOTIFICATION, payload),
  removeNotification: payload => actionCreator(constants.REMOVE_NOTIFICATION, payload),
  setGlobalBannerContent: payload => actionCreator(constants.SET_GLOBAL_BANNER_CONTENT, payload),
  sendEmail: (payload, callback) => {
    const args = { type: constants.SEND_EMAIL, payload, callback };
    return api.sendEmail(args);
  },
  login: (payload, callback) => {
    const args = { type: constants.LOG_IN, payload, callback };
    return api.login(args);
  },
  sampleAPICall: (payload, callback) => {
    const args = { type: constants.SAMPLE_API_CALL, payload, callback };
    return api.sampleAPICall(args);
  },
  testRateLimit: (payload, callback) => {
    const args = { type: constants.TEST_RATE_LIMIT, payload, callback };
    return api.testRateLimit(args);
  },
};

export default appActions;