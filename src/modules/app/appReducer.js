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
    case constants.UPDATE_NOTIFICATIONS:
      return state.update(constants.STATE_KEY_NOTIFICATIONS);

    default:
      return initialState;
  }
};

export default reducer;