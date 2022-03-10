import React from 'react';
import { buildClasses } from 'helpers/utilityHelpers';
import './Component.scss';

const Component = props => {
  const { className, ...rest } = props;

  const classes = [
    { condition: className, name: className }
  ];

  return (
    <div className={buildClasses(classes, "default")} {...rest}>
      Component
    </div>
  );
};

export default Component;