import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './store';
import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from '@sentry/browser';
import Heartbeat from 'components/Heartbeat/Heartbeat';
import App from 'scenes/App/App';
import '@fortawesome/fontawesome-pro/css/all.css';
import './index.scss';

const { NODE_ENV, REACT_APP_SENTRY_DSN: dsn } = process.env;
const inProduction = NODE_ENV === 'production';

if (inProduction && dsn) {
  Sentry.init({
    dsn,
    integrations: [ new BrowserTracing() ],
    tracesSampleRate: 1.0,
  });
};

const MyApp = (
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Heartbeat disabled={!inProduction}>
          <App />
        </Heartbeat>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);

const target = document.querySelector('#root');

// React 18
// ReactDOM.createRoot(target).render(MyApp);

// React 17
ReactDOM.render(MyApp, target);