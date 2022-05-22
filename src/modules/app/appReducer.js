/* eslint-disable no-unused-vars */
import { isEmpty } from 'lodash';
import StateManager from 'helpers/stateManager/stateManager';
import constants from './appConstants';

const mixed = {
  two: 2,
  four: [
    'six',
    { five: 5 }, // expecting { five: 5, test: 'Test' }
    [ 7, 8, 9, 10 ]
  ],
};

const initial = {
  [constants.STATE_KEY_NOTIFICATIONS]: [],
  testArr: [ 'one', mixed, 3 ],
};

const reducer = (initialState = initial, action = {}) => {
  const { meta, payload } = action;
  const state = new StateManager(initialState);

  switch(action.type) {
    case 'Test':
      state.add('testArr', payload, [1, 'four', 1]);
    case constants.SAMPLE_ACTION:
      return state.update(constants.STATE_KEY_SAMPLE_SELECTOR, payload);
    case constants.ADD_NOTIFICATION:
      return state.add(constants.STATE_KEY_NOTIFICATIONS, payload);
    case constants.REMOVE_NOTIFICATION:
      const index = payload;
      return state.remove(constants.STATE_KEY_NOTIFICATIONS, index);
    case constants.SAMPLE_API_CALL:
      return state.update(constants.STATE_KEY_SAMPLE_API_RESPONSE, payload);
    case constants.SEND_EMAIL:
      return state.update(constants.STATE_KEY_EMAIL_RESPONSE, payload);
    case constants.SET_GLOBAL_BANNER_CONTENT:
      return state.add(constants.STATE_KEY_GLOBAL_BANNER_CONTENT, payload);

    default:
      return initialState;
  }
};

const action = {
  type: 'Test',
  payload: { test: 'Test' },
};

reducer(initial, action);

export default reducer;