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
            Stylesheet vars {stylesheetVar ? "accessible" : "inaccessible"}
          </strong>:<br />

          SCSS vars {stylesheetVar ? "successfully used" : "failed"} in JS file.
        </p>
      } />
    </Fragment>
  );
};

export default CheckStyles;