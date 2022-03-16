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
  const sampleAPIResponse = useSelector(state => appSelectors.sampleAPIResponse(state));
  const sampleAPICall = useCallback((payload, callback) => (
    dispatch(appActions.sampleAPICall(payload, callback))
  ), [dispatch]);

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
    const warning = (
      <span>
        Request successful,<br />
        but no response from reducer.
      </span>
    );

    if (!sampleAPIResponse && status.code === 200) return warning;
    if (!status.code && !status.satusText) return "No res.json() sent.";

    return `Response ${status.code}: ${status.text}`;
  };

  useEffect(() => {
    if (status) setDesc(makeDesc());
    /* eslint-disable-next-line */
  }, [status]);

  useEffect(() => {
    if (!sampleAPIResponse) {
      const onSuccess = res => {
        console.log("Success")
        if (res) {
          setStatus({
            code: res.status,
            text: res.statusText,
          });
        }
      };

      sampleAPICall(null, onSuccess);
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
    </Fragment>
  );
};

export default CheckAPI;