import React, { Fragment } from 'react';
import { hexValid } from 'helpers/validators';
import { buildClasses } from 'helpers/utilityHelpers';
import colors from 'theme/colors.scss';
import './Status.scss';

const Status = props => {
  const { color, text, className, ...rest } = props;

  const classes = [
    { condition: className, name: className },
  ];

  const statusStyle = {
    color: hexValid(color) || colors.grey
  };

  return (
    <div className="status">
      <i className={buildClasses(classes, "fa-solid fa-circle")} style={statusStyle}  {...rest} />

      {text && (
        <Fragment>
          &nbsp;{text}
        </Fragment>
      )}
    </div>
  );
};

export default Status;