import React from 'react';
import {
  authAndRedirects,
  updatePublic,
  documentation,
  removeFromApp
} from './codeStrings';

const NextSteps = props => {
  return (
    <div className="nextSteps">
      <h2>Next Steps...</h2>
      <p>
        See yellow or red? Iron things out before proceeding.<br />
        Green or grey? You're ready to start building your app!
      </p>

      <p>
        See {documentation} for details.
      </p>

      <p>
        <strong>Step 1: Remove the following in App.js</strong>:<br />
        <span className="code">
          {removeFromApp}
        </span>
      </p>

      <p>
        <strong>Step 2: Update authenticated routes or redirects in App.js</strong>:<br />
        <span className="code">
          {authAndRedirects}
        </span>
      </p>

      <p>
        <strong>Step 3: Update the following in /public</strong>:<br />
        <span className="code">
          {updatePublic}<br />
          Optional: Add "apple-touch-icon.png"
        </span>
      </p>

      <p>
        <strong>Step 4: Remove /components/DeleteMe.</strong>
      </p>
    </div>
  );
};

export default NextSteps;