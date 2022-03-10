import StateManager from 'helpers/stateHelpers';
import constants from './appConstants';

const reducer = (initialState = {}, action = {}) => {
  const state = new StateManager(initialState, action);

  switch(action.type) {
    case constants.SAMPLE_ACTION:
      return state.update(constants.STATE_KEY_SAMPLE_SELECTOR);

    default:
      return initialState;
  }
};

export default reducer;