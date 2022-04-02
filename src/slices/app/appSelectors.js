import constants from './appConstants';

/*
* How to use: In component, import and declare variable from state.
* import { useSelector } from 'helpers/stateHelpers';
* import appSelectors from 'slices/app/appSelectors';
*
* const sample = useSelector(state => appSelectors.sampleSelector(state));
*/

const appSelectors = {
  sampleSelector: state => state.app[constants.STATE_KEY_SAMPLE_SELECTOR],
  notifications: state => state.app[constants.STATE_KEY_NOTIFICATIONS],
  emailResponse: state => state.app[constants.STATE_KEY_EMAIL_RESPONSE],
  sampleAPIResponse: state => state.app[constants.STATE_KEY_SAMPLE_API_RESPONSE],
  globalBannerContent: state => state.app[constants.STATE_KEY_GLOBAL_BANNER_CONTENT],
};

export default appSelectors;