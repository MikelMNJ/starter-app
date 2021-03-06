import React from 'react';
import {
  authAndRedirects,
  updatePublic,
  cleanConstants,
  cleanActions,
  cleanAppAPI,
  cleanSampleRoutes,
  cleanSampleController,
} from './codeStrings';

const terminationWarning = (str, str2) => `${str} will ${str2 || "terminate"} this page, please be sure you don't need anything else before proceeding.`;

const content = [
  {
    name: "Configure",
    content:
      <div>
        <h3>Configure</h3>
        {terminationWarning("Modifying redirect from /ready", "stop rendering")}

        <p>
          <strong>Step 1: Remove /ready route and update authenticated routes or redirects.</strong>
        </p>

        <strong className="code">
          In src/controllers/routesController.js
        </strong>:<br />
        <p className="code">{authAndRedirects}</p>

        <p>
          <strong>Step 2: Update the following.</strong>
        </p>

        <strong className="code">
          In public
        </strong>:<br />
        <p className="code">
          {updatePublic}<br />
          Optional: Add "apple-touch-icon.png"
        </p>
      </div>
  },
  {
    name: "Back-end cleanup (optional)",
    content:
      <div>
        <h3>Back-end cleanup (optional)</h3>
        <p>
          <strong>Step 3: Remove the rate limit test route.</strong>
        </p>

        <strong className="code">
          In functions/routes/sampleRoutes.js
        </strong>:<br />
        <p className="code">{cleanSampleRoutes}</p>

        <strong className="code">
          In functions/controllers/sampleController.js
        </strong>:<br />
        <p className="code">{cleanSampleController}</p>
      </div>
  },
  {
    name: "Front-end cleanup (recommended)",
    content:
      <div>
        <h3>Front-end cleanup (recommended)</h3>
        {terminationWarning("Removing DeleteMe imports, components or folders")}
        <p>
          <strong>Step 4: Remove entire /scenes/DeleteMe folder (This component).</strong>
        </p>

        <p>
          <strong>Step 5: Remove the rate limit constant, actions and API test call.</strong>
        </p>

        <strong className="code">
          In modules/app/appConstants.js
        </strong>:<br />
        <p className="code">{cleanConstants}</p>

        <strong className="code">
          In modules/app/appActions.js
        </strong>:<br />
        <p className="code">{cleanActions}</p>

        <strong className="code">
          In modules/app/appApi.js
        </strong>:<br />
        <p className="code">{cleanAppAPI}</p>

      </div>
  },
];

export default content;