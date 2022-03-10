import { actionCreator } from 'helpers/stateHelpers';
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
};

export default appActions;