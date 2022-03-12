import React from 'react';
import { buildClasses } from 'helpers/utilityHelpers';
import CheckRouting from './CheckRouting';
import CheckState from './CheckState';
import CheckStyles from './CheckStyles';
import CheckDB from './CheckDB';
import CheckAPI from './CheckAPI';
import CheckHeartbeat from './CheckHeartbeat';
import CheckMonitoring from './CheckMonitoring';
import './ReplaceMe.scss';

const Checklist = props => {
  const { path, className, ...rest } = props;
  const classes = [{ condition: className, name: className }];

  return (
    <div className={buildClasses(classes, "checklist")} {...rest}>
      <h2>App Status</h2>

      <h3>Front-End</h3>
      <CheckRouting />
      <CheckState />
      <CheckStyles />

      <h3>Back-End</h3>
      <CheckDB />
      <CheckAPI path={path} />

      <h3>Integration</h3>
      <CheckHeartbeat />
      <CheckMonitoring />
    </div>
  );
};

export default Checklist;