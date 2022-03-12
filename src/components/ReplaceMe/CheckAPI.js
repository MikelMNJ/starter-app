import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';

const { REACT_APP_MONGO_URI } = process.env;

export const CheckAPI = props => {
  const { path } = props;
  const [ status, setStatus ] = useState(null);
  const mongoURI = REACT_APP_MONGO_URI;
  const statusOK = status === 200;

  useEffect(() => {
    apiStatus();
    /* eslint-disable-next-line */
  }, []);

  async function apiStatus() {
    const details = res => ({
      code: res.status,
      text: res.statusText,
      method: res.config.method?.toUpperCase(),
    });

    try {
      if (path) {
        const res = await axios.get(path);
        setStatus(details(res));
        return details(res);
      }

      throw Error();
    } catch(e) {
      const res = e.response;
      setStatus(details(res));
    }
  };

  return (
    <Fragment>
      <Status color={mongoURI ? (statusOK ? colors.green : colors.red) : colors.grey} text={
        <p>
          <strong>
            API {mongoURI ? (statusOK ? "connected" : "offline") : "unknown"}
          </strong>:<br />

          {!mongoURI && "No database connection. "}
          {mongoURI && (
            statusOK
              ? "Response received."
              : `Error ${status?.code}:
                  ${status?.text || "No test path provided."}
                  ${path && ` (${status?.method} ${path}).`}`
          )}
        </p>
      } />
    </Fragment>
  );
};

export default CheckAPI;