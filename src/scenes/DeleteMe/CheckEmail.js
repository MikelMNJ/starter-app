import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'helpers/stateHelpers';
import appActions from 'modules/app/appActions';
import appSelectors from 'modules/app/appSelectors';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

const { REACT_APP_EMAIL_API_KEY: apiKey } = process.env;

const CheckEmail = props => {
  const [ status, setStatus ] = useState({});
  const [ desc, setDesc ] = useState(null);
  const dispatch = useDispatch();

  // Actions/Selectors
  const emailResponse = useSelector(state => appSelectors.emailResponse(state));
  const sendEmail = useCallback((payload, callback) => (
    dispatch(appActions.sendEmail(payload, callback))
  ), [dispatch]);

  const makeColor = () => {
    if (!apiKey) return colors.grey;
    if (status?.code < 300) return colors.green;

    return colors.yellow;
  };

  const makeStatus = () => {
    if (apiKey && status?.code < 300) return "enabled";
    return "disabled";
  };

  const makeDesc = () => {
    const warning = (
      <span>
        API key provided,<br />
        but request failed.
      </span>
    );

    if (!apiKey) return "No API key provided."
    if (status?.code < 300) return "Sandbox email sent.";
    if (status?.code >= 400) return warning;

    return "Request not sent."
  };

  useEffect(() => {
    if (status) setDesc(makeDesc());
    /* eslint-disable-next-line */
  }, [status, emailResponse]);

  useEffect(() => {
    if (!emailResponse) {
      const payload = { email: "test@test.com" };
      const onRes = res => {
        setStatus({
          code: res.status,
          text: res.statusText,
        });
      };

      sendEmail(payload, onRes);
    }

    /* eslint-disable-next-line */
  }, []);

  return (
    <Fragment>
      <Status color={makeColor()} text={
        <p>
          <strong>
            Email dispatch {makeStatus()}
          </strong>:<br />
          {desc}
        </p>
      } />
    </Fragment>
  );
};

export default CheckEmail;