import React from 'react';
import { buildClasses } from 'helpers/utilityHelpers';
import CheckRouting from './CheckRouting';
import CheckState from './CheckState';
import CheckNotifications from './CheckNotifications';
import CheckStyles from './CheckStyles';
import CheckDB from './CheckDB';
import CheckAPI from './CheckAPI';
import CheckRateLimit from './CheckRateLimit';
import CheckHeartbeat from './CheckHeartbeat';
import CheckMonitoring from './CheckMonitoring';
import CheckEmail from './CheckEmail';
import CheckAuth from './CheckAuth';
import './DeleteMe.scss';

const Checklist = props => {
  const { className, ...rest } = props;
  const classes = [{ condition: className, name: className }];

  return (
    <div className={buildClasses(classes, "checklist")} {...rest}>
      <h2>App Status</h2>

      <div className="checklistSection">
        <h3>Front-end</h3>
        <CheckRouting />
        <CheckState />
        <CheckNotifications />
        <CheckStyles />
      </div>

      <div className="checklistSection">
        <h3>Back-end</h3>
        <CheckDB />
        <CheckAPI />
        <CheckRateLimit />
        <CheckEmail />
        <CheckAuth />
      </div>

      <div className="checklistSection">
        <h3>Integration</h3>
        <CheckHeartbeat />
        <CheckMonitoring />
      </div>
    </div>
  );
};

export default Checklist;