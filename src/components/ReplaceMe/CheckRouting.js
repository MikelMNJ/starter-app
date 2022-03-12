import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

export const CheckRouting = props => {
  const { pathname } = useLocation();
  const pathMatch = pathname.includes("ready");

  return (
    <Fragment>
      <Status color={pathMatch ? colors.green : colors.grey} text={
        <p>
          <strong>
            Routing {pathMatch ? "established" : "unknown"}
          </strong>:<br />

          Route {pathMatch ? "match" : "mismatch"}.
        </p>
      } />
    </Fragment>
  );
};

export default CheckRouting;