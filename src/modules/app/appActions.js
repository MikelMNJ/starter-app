import { actionCreator } from 'helpers/stateHelpers';
/* eslint-disable-next-line */
import * as api from './appApi';
import constants from './appConstants';

/*
* How to use: In component, import and declare variable from state.
* import { useDispatch } from 'helpers/stateHelpers';
* import appActions from 'modules/app/appActions';
*
* const dispatch = useDispatch();
* const setSample = payload => dispatch(appActions.sampleAction(payload));
* setSample("Sample payload.");
*/

const appActions = {
  sampleAction: payload => actionCreator(constants.SAMPLE_ACTION, payload),
  addNotification: payload => actionCreator(constants.ADD_NOTIFICATION, payload),
  removeNotification: payload => actionCreator(constants.REMOVE_NOTIFICATION, payload),
  sampleAPICall: (payload, callback) => {
    const args = { type: constants.SAMPLE_API_CALL, payload,  callback };
    return api.sampleAPICall(args);
  },
  testRateLimit: (payload, callback) => {
    const args = { type: constants.TEST_RATE_LIMIT, payload,  callback };
    return api.testRateLimit(args);
  },
};

export default appActions;