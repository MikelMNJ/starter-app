import React from 'react';
import { authAndRedirects, updatePublic, documentation, removeFromApp } from './strings';

const NextSteps = props => {
  return (
    <div className="nextSteps">
      <h2>Next Steps...</h2>
      <p>
        See any red? Iron things out before proceeding.<br />
        Green or grey? You're ready to start building your app!
      </p>

      <p>
        <strong>Step 1: Remove the following in App.js</strong>:<br />
        <span className="code">
          {removeFromApp}
        </span>
      </p>

      <p>
        <strong>Step 2: Update/Remove Auth. Route or Redirect in App.js</strong>:<br />
        <span className="code">
          {authAndRedirects}
        </span>
      </p>

      <p>
        <strong>Step 3: Update the following in /public</strong>:<br />
        <span className="code">
          {updatePublic}
        </span>
      </p>

      <p>
        <strong>Step 4: Remove /components/ReplaceMe.</strong>
      </p>

      <p>
        <strong>Optional: Add apple-touch-icon.png in /public.</strong>
      </p>

      <p>
        See {documentation} for details.
      </p>
    </div>
  );
};

export default NextSteps;