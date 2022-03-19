import React, { Fragment } from 'react';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

const { NODE_ENV }= process.env;

export const CheckHeartbeat = props => {
  const inProduction = NODE_ENV === 'production';

  return (
    <Fragment>
      <Status color={inProduction ? colors.green : colors.grey} text={
        <p>
          <strong>
            Heartbeat {inProduction ? "enabled" : "disabled"}
          </strong>

          {!inProduction && ":"}<br />
          {!inProduction && "In development env."}
        </p>
      } />
    </Fragment>
  );
};

export default CheckHeartbeat;