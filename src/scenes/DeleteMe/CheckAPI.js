import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import { globalMessage } from './codeStrings';
import appActions from 'slices/app/appActions';
import appSelectors from 'slices/app/appSelectors';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

export const CheckAPI = props => {
  const [ status, setStatus ] = useState({});
  const [ desc, setDesc ] = useState(null);
  const dispatch = useDispatch();

  // Actions/Selectors
  const sampleAPIResponse = useSelector(state => appSelectors.sampleAPIResponse(state));
  const sampleAPICall = useCallback((payload, callback) => (
    dispatch(appActions.sampleAPICall(payload, callback))
  ), [dispatch]);
  const globalBannerContent = useSelector(state => appSelectors.globalBannerContent(state));
  const setGlobalBannerContent = payload => dispatch(appActions.setGlobalBannerContent(payload));

  const makeColor = () => {
    if (sampleAPIResponse && status?.code === 200) return colors.green;
    if (!sampleAPIResponse && status?.code === 200) return colors.yellow;
    return colors.red;
  };

  const makeStatus = () => {
    if (status?.code === 200) return "ready";
    return "offline";
  };

  const makeDesc = () => {
    const text = `: ${status.text}`;
    const warning = (
      <span>
        Request successful,<br />
        but no response from reducer.
      </span>
    );

    if (!sampleAPIResponse && status.code === 200) return warning;
    if (!status.code && !status.text) return "No data received.";

    return `${status.code}${status.text ? text : " Response"}.`;
  };

  useEffect(() => {
    if (status) setDesc(makeDesc());

    if (!globalBannerContent && status.code === 502) {
      setGlobalBannerContent(globalMessage);
    }

    /* eslint-disable-next-line */
  }, [status, sampleAPIResponse]);

  useEffect(() => {
    if (!sampleAPIResponse) {
      const onRes = res => {
        setStatus({
          code: res.status,
          text: res.statusText,
          cache: res.headers.get("cache-control"),
        });
      };

      sampleAPICall(null, onRes);
    }

    /* eslint-disable-next-line */
  }, [sampleAPIResponse]);

  return (
    <Fragment>
      <Status color={makeColor()} text={
        <p>
          <strong>
            API {makeStatus()}
          </strong>:<br />

          {desc}
        </p>
      } />

      <Status color={status?.cache ? colors.green : colors.grey} text={
        <p>
          <strong>
            API cache {status?.cache ? "returned" : "absent"}
          </strong>

          {status?.cache !== "no-cache" ?? ":"}<br />
          {status?.cache !== "no-cache" ?? `"${status?.cache}".`}
        </p>
      } />
    </Fragment>
  );
};

export default CheckAPI;