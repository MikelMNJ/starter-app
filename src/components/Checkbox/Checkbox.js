import React from 'react';
import { Field } from 'formik';
import { buildClasses } from 'helpers/utilityHelpers';
import { iconValid } from 'helpers/validators';
import colors from 'theme/colors.scss';
import './Checkbox.scss';

const Checkbox = props => {
  const { name, label, icon, className, boxColor, checkColor, disabled, ...rest } = props;

  const boxStyle = { borderColor: disabled ? colors.warmGrey : boxColor };
  const checkStyle = { color: disabled ? colors.warmGrey : checkColor };

  const classes = [
    { condition: className, name: className },
  ];

  return (
    <label className={buildClasses(classes, "checkboxContainer")} {...rest}>
      {label}
      <Field type="checkbox" name={name} disabled={disabled} />

      <div className="box" style={boxStyle}>
        <i
          className={`check ${iconValid(icon) || "fa-solid fa-check"}`}
          style={checkStyle}
        />
      </div>
    </label>
  );
};

export default Checkbox;