import React, { Fragment } from 'react';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

const {
  NODE_ENV,
  REACT_APP_SENTRY_DSN,
} = process.env;

const CheckMonitoring = props => {
  const inProduction = NODE_ENV === 'production';
  const sentryDSN = REACT_APP_SENTRY_DSN;

  return (
    <Fragment>
      <Status color={inProduction && sentryDSN ? colors.green : colors.grey} text={
        <p>
          <strong>
            Error monitoring {inProduction && sentryDSN ? "enabled" : "disabled"}
          </strong>:<br />

          {!inProduction && "In development env. "}
          {inProduction && (sentryDSN ? "Sentry DSN provided." : "Sentry DSN not provided.")}
        </p>
      } />
    </Fragment>
  );
};

export default CheckMonitoring;