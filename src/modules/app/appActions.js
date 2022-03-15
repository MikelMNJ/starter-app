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
  updateNotifications: payload => actionCreator(constants.UPDATE_NOTIFICATIONS, payload),
  sampleAPICall: (payload, callback) => {
    const args = { type: constants.SAMPLE_API_CALL, payload,  callback };
    return api.sampleAPICall(args);
  },
};

export default appActions;