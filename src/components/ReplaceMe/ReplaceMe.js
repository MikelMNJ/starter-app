import React from 'react';
import { fadeIn } from 'helpers/animationHelpers';
import Checklist from './Checklist';
import NextSteps from './NextSteps';
import './ReplaceMe.scss';

const ReplaceMe = props => {
  const { testPath } = props;

  return (
    <div className="replaceMe">
      <div className={`layout ${fadeIn}`}>
        <Checklist path={testPath} />
        <NextSteps />
      </div>
    </div>
  );
};

export default ReplaceMe;