import constants from './appConstants';

/*
* How to use: In component, import and declare variable from state.
* import { useSelector } from 'helpers/stateHelpers';
* import appSelectors from 'modules/app/appSelectors';
*
* const sample = useSelector(state => appSelectors.sampleSelector(state));
*/

const appSelectors = {
  sampleSelector: state => state.app[constants.STATE_KEY_SAMPLE_SELECTOR],
  notifications: state => state.app[constants.STATE_KEY_NOTIFICATIONS],
};

export default appSelectors;