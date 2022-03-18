import React, { Fragment } from 'react';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

export const CheckStyles = props => {
  const stylesheetVar = colors.blue;

  return (
    <Fragment>
      <Status color={stylesheetVar ? colors.green : colors.red} text={
        <p>
          <strong>
            Style exports {stylesheetVar ? "available" : "unavailable"}
          </strong>:<br />

          Style vars {stylesheetVar ? "used" : "failed"} in JS.
        </p>
      } />
    </Fragment>
  );
};

export default CheckStyles;