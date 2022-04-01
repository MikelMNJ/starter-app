import StateManager from 'helpers/stateManager/stateManager';
import constants from './appConstants';

const initial = {
  [constants.STATE_KEY_NOTIFICATIONS]: [],
};

const reducer = (initialState = initial, action = {}) => {
  /* eslint-disable-next-line */
  const { meta, payload } = action;
  const state = new StateManager(initialState);

  switch(action.type) {
    case constants.SAMPLE_ACTION:
      return state.update(constants.STATE_KEY_SAMPLE_SELECTOR, payload);
    case constants.ADD_NOTIFICATION:
      return state.add(constants.STATE_KEY_NOTIFICATIONS, payload);
    case constants.REMOVE_NOTIFICATION:
      const index = payload;
      return state.remove(constants.STATE_KEY_NOTIFICATIONS, index);
    case constants.SET_GLOBAL_BANNER_CONTENT:
      return state.add(constants.STATE_KEY_GLOBAL_BANNER_CONTENT, payload);
    case constants.SEND_EMAIL:
      return state.update(constants.STATE_KEY_EMAIL_RESPONSE, payload);
    case constants.SAMPLE_API_CALL:
      return state.update(constants.STATE_KEY_SAMPLE_API_RESPONSE, payload);

    default:
      return initialState;
  }
};

export default reducer;