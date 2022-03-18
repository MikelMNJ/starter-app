import React from 'react';
import Tabs from 'components/Tabs/Tabs';
import content from './stepContent';
import { documentation } from './codeStrings';

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

      <Tabs className="stepTabs" content={content} />
    </div>
  );
};

export default NextSteps;