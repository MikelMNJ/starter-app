import { actionCreator } from 'helpers/stateHelpers';
import constants from './rootConstants';

const rootActions = {
  logout: payload => actionCreator(constants.LOG_OUT, payload),
};

export default rootActions;