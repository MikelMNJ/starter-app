import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { buildClasses } from 'helpers/utilityHelpers';
import axios from 'axios';
import Status from 'components/Status/Status';
import colors from 'theme/colors.scss';
import './ReplaceMe.scss';

const {
  NODE_ENV,
  REACT_APP_SENTRY_DSN,
  REACT_APP_MONGO_URI,
} = process.env;

const Checklist = props => {
  const { apiTestPath, sampleSelector, className, ...rest } = props;
  const [ status, setStatus ] = useState(null);

  const { pathname } = useLocation();
  const classes = [{ condition: className, name: className }];
  const stylesheetVar = colors.blue;
  const pathMatch = pathname.includes("ready");
  const inProduction = NODE_ENV === 'production';
  const sentryDSN = REACT_APP_SENTRY_DSN;
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
      if (apiTestPath) {
        const res = await axios.get(apiTestPath);
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
    <div className={buildClasses(classes, "checklist")} {...rest}>
      <h3>Front-End</h3>
      {/* Routing */}
      <Status
        color={pathMatch ? colors.green : colors.grey}
        text={
          <p>
            <strong>Routing {pathMatch ? "established" : "unknown"}</strong>:<br />
            Route {pathMatch ? "match" : "mismatch"}.
          </p>
        }
      />

      {/* Global State */}
      <Status
        color={sampleSelector ? colors.green : colors.red}
        text={
          <p>
            <strong>Global state {sampleSelector ? "accessible" : "inaccessible"}</strong>:<br />
            Reducer {sampleSelector ? "successfully updated" : "could not be reached"}.
          </p>
        }
      />

      {/* Stylesheet Variables */}
      <Status
        color={stylesheetVar ? colors.green : colors.red}
        text={
          <p>
            <strong>Stylesheet vars {stylesheetVar ? "accessible" : "inaccessible"}</strong>:<br />
            SCSS vars {stylesheetVar ? "successfully used" : "failed"} in JS file.
          </p>
        }
      />

      <h3>Back-End</h3>
      {/* Database */}
      <Status
        color={mongoURI ? colors.green : colors.grey}
        text={
          <p>
            <strong>Database {mongoURI ? "ready" : "unknown"}</strong>:<br />
            {!mongoURI && "No"} URI provided.
          </p>
        }
      />

      {/* API */}
      <Status
        color={mongoURI ? (statusOK ? colors.green : colors.red) : colors.grey}
        text={
          <p>
            <strong>API {mongoURI ? (statusOK ? "connected" : "offline") : "unknown"}</strong>:<br />
            {!mongoURI && "No database connection. "}
            {mongoURI && (
              statusOK
                ? "Response received."
                : `Error ${status?.code}:
                    ${status?.text || "No apiTestPath provided."}
                    ${apiTestPath && ` (${status?.method} ${apiTestPath}).`}`
            )}
          </p>
        }
      />

      <h3>Monitoring</h3>
      {/* Heartbeat */}
      <Status
        color={inProduction ? colors.green : colors.grey}
        text={
          <p>
            <strong>Heartbeat {inProduction ? "enabled" : "disabled"}</strong>:<br />
            {inProduction ? "Production" : "Development"} environment.
          </p>
        }
      />

      {/* Error Monitoring */}
      <Status
        color={inProduction && sentryDSN ? colors.green : colors.grey}
        text={
          <p>
            <strong>Error monitoring {inProduction && sentryDSN ? "enabled" : "disabled"}</strong>:<br />
            {!inProduction && "Development environment. "}
            {inProduction && (sentryDSN ? "Sentry DSN provided." : "Sentry DSN not provided.")}
          </p>
        }
      />
    </div>
  )
}

export default Checklist;