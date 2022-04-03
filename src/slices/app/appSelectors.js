import constants from './appConstants';

/*
* How to use: In component, import and declare variable from state.
* import { useSelector } from 'helpers/stateHelpers';
* import appSelectors from 'slices/app/appSelectors';
*
* const sample = useSelector(state => appSelectors.sampleSelector(state));
*/

const appSelectors = {
  notifications: state => state.app[constants.STATE_KEY_NOTIFICATIONS],
  globalBannerContent: state => state.app[constants.STATE_KEY_GLOBAL_BANNER_CONTENT],
  emailResponse: state => state.app[constants.STATE_KEY_EMAIL_RESPONSE],

  // Remove: example only...
  sampleSelector: state => state.app[constants.STATE_KEY_SAMPLE_SELECTOR],
  sampleAPIResponse: state => state.app[constants.STATE_KEY_SAMPLE_API_RESPONSE],
};

export default appSelectors;