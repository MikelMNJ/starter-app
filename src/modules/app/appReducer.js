import StateManager from 'helpers/stateHelpers';
import constants from './appConstants';

const initial = {
  [constants.STATE_KEY_NOTIFICATIONS]: [],
};

const reducer = (initialState = initial, action = {}) => {
  const state = new StateManager(initialState, action);

  switch(action.type) {
    case constants.SAMPLE_ACTION:
      return state.update(constants.STATE_KEY_SAMPLE_SELECTOR);
    case constants.ADD_NOTIFICATION:
      return state.add(constants.STATE_KEY_NOTIFICATIONS);
    case constants.REMOVE_NOTIFICATION:
      const index = action.payload;
      return state.remove(constants.STATE_KEY_NOTIFICATIONS, index);
    case constants.SET_GLOBAL_BANNER_CONTENT:
      return state.add(constants.STATE_KEY_GLOBAL_BANNER_CONTENT);
    case constants.SEND_EMAIL:
      return state.update(constants.STATE_KEY_EMAIL_RESPONSE);
    case constants.SAMPLE_API_CALL:
      return state.update(constants.STATE_KEY_SAMPLE_API_RESPONSE);

    default:
      return initialState;
  }
};

export default reducer;