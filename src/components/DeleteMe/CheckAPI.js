import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

const {
  REACT_APP_MONGO_URI: mongoURI,
  REACT_APP_API_BASE_PATH: basePath,
} = process.env;

export const CheckAPI = props => {
  const [ status, setStatus ] = useState({});
  const dispatch = useDispatch();

  // Actions/Selectors
  const sampleAPIResponse = useSelector(state => appSelectors.sampleAPIResponse(state));
  const sampleAPICall = useCallback((payload, callback) => (
    dispatch(appActions.sampleAPICall(payload, callback))
  ), [dispatch]);

  const makeColor = () => {
    if (!mongoURI) return colors.grey;
    if (sampleAPIResponse && status?.code === 200) return colors.green;
    if (!sampleAPIResponse && status?.code === 200) return colors.yellow;

    return colors.red;
  };

  const makeStatus = () => {
    if (!mongoURI) return "unknown";
    if (status?.code === 200) return "ready";

    return "offline";
  };

  const makeDesc = res => {
    const warning = (
      <span>
        Request successful,<br />
        but no response from reducer.
      </span>
    );

    if (!mongoURI) return "No database connection.";
    if (!basePath) return "No test path provided.";
    if (!sampleAPIResponse && res?.status === 200) return warning;
    if (!res?.status && !res?.satusText) return "Request failed.";

    return `Response ${res?.status}: ${res?.statusText}`;
  };

  useEffect(() => {
    if (!sampleAPIResponse && mongoURI && basePath) {
      const onSuccess = res => {
        if (res) {
          setStatus({
            code: res.status,
            text: res.statusText,
            desc: makeDesc(res),
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

          {status.desc || makeDesc()}
        </p>
      } />
    </Fragment>
  );
};

export default CheckAPI;