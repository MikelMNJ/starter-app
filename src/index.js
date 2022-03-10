import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './store';
import App from 'scenes/App/App';
import '@fortawesome/fontawesome-pro/css/all.css';
import './index.scss';

const MyApp = (
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);

const target = document.querySelector('#root');

// React 18
// ReactDOM.createRoot(target).render(MyApp);

// React 17
ReactDOM.render(MyApp, target);