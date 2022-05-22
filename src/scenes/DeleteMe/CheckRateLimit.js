import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import { globalMessage } from './codeStrings';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

let callCount = 0;

export const CheckAPI = props => {
  const [ status, setStatus ] = useState({});
  const [ desc, setDesc ] = useState(null);
  const dispatch = useDispatch();

  // Actions/Selectors
  const testRateLimit = useCallback((payload, callback) => (
    dispatch(appActions.testRateLimit(payload, callback))
    ), [dispatch]);
    const globalBannerContent = useSelector(state => appSelectors.globalBannerContent(state));
    const setGlobalBannerContent = payload => dispatch(appActions.setGlobalBannerContent(payload));

  const makeDesc = () => {
    if (status.code >= 500) return "API offline.";
    if (status.code === 429) return "Follow-up request blocked.";
    if (!status.code && !status.text) return "Test incomplete.";
  };

  useEffect(() => {
    if (status) setDesc(makeDesc());

    if (!globalBannerContent && status.code === 502) {
      setGlobalBannerContent(globalMessage);
    }

    /* eslint-disable-next-line */
  }, [status]);

  useEffect(() => {
    if (isEmpty(status) || status.code === 200) {
      const onRes = res => {
        setStatus({
          code: res.status,
          text: res.statusText,
        });
      };

      // Manual safeguard in case rateLimit breaks.
      if (callCount < 3) {
        testRateLimit(null, onRes);
        callCount += 1;
      }
    }

    /* eslint-disable-next-line */
  }, [status]);

  return (
    <Fragment>
      <Status color={status?.code === 429 ? colors.green : colors.grey} text={
        <p>
          <strong>
            Rate limiter&nbsp;
            {status?.code === 429 ? "active" : "not tested"}
          </strong>:<br />

          {desc}
        </p>
      } />
    </Fragment>
  );
};

export default CheckAPI;