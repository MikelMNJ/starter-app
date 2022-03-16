import React from 'react';
import './Component.scss';

const Component = props => {
  const { ...rest } = props;

  return (
    <div {...rest}>
      Component
    </div>
  );
};

export default Component;