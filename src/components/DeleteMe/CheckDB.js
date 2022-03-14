import React, { Fragment } from 'react';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

const { REACT_APP_MONGO_URI } = process.env;

export const CheckDB = props => {
  const mongoURI = REACT_APP_MONGO_URI;

  return (
    <Fragment>
      <Status color={mongoURI ? colors.green : colors.grey} text={
        <p>
          <strong>
            Database {mongoURI ? "ready" : "unknown"}
          </strong>:<br />

          {!mongoURI && "No"} URI provided.
        </p>
      } />
    </Fragment>
  );
};

export default CheckDB;