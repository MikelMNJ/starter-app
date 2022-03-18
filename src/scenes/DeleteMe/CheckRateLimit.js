import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

export const CheckAPI = props => {
  const [ status, setStatus ] = useState({});
  const [ desc, setDesc ] = useState(null);
  const dispatch = useDispatch();

  // Actions/Selectors
  const testRateLimit = useCallback((payload, callback) => (
    dispatch(appActions.testRateLimit(payload, callback))
  ), [dispatch]);

  const makeDesc = () => {
    if (status.code >= 500) return "API offline.";
    if (status.code === 429) return "Follow-up request blocked.";
    if (!status.code && !status.text) return "Test incomplete.";
  };

  useEffect(() => {
    if (status) setDesc(makeDesc());
    /* eslint-disable-next-line */
  }, [status]);

  useEffect(() => {
    const onRes = res => {
      if (res.status === 429) {
        setStatus({
          code: res.status,
          text: res.statusText,
        });
      }
    };

    // Intentionally triggering twice...
    testRateLimit(null, onRes);
    testRateLimit(null, onRes);
    /* eslint-disable-next-line */
  }, []);

  return (
    <Fragment>
      <Status color={status?.code === 429 ? colors.green : colors.grey} text={
        <p>
          <strong>
            Rate limiter&nbsp;
            {status?.code === 429 ? "active" : "inactive"}
          </strong>:<br />

          {desc}
        </p>
      } />
    </Fragment>
  );
};

export default CheckAPI;