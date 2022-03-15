import React from 'react';
import { fadeIn } from 'helpers/animationHelpers';
import Checklist from './Checklist';
import NextSteps from './NextSteps';
import './DeleteMe.scss';

const DeleteMe = props => {
  return (
    <div className="deleteMe">
      <div className={`layout ${fadeIn}`}>
        <Checklist />
        <NextSteps />
      </div>
    </div>
  );
};

export default DeleteMe;