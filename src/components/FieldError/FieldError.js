import React from 'react';
import { Field, getIn } from 'formik';
import { buildClasses } from 'helpers/utilityHelpers';
import { isEmpty } from 'lodash';
import './FieldError.scss';

const FieldError = props => {
  const { name, className, ...rest } = props;

  const classes = [
    { condition: className, name: className },
  ];

  const buildFieldError = () => {
    if (name) {
      return (
        <Field name={name}>
          {({ form }) => {
            const { errors, touched } = form;
            const msg = getIn(errors, name);
            const isTouched = getIn(touched, name);
            const showError = !isEmpty(msg) && isTouched;

            if (showError) {
              return (
                <div className={buildClasses(classes, "fieldError")} {...rest}>
                  {msg}
                </div>
              );
            }

            return null;
          }}
        </Field>
      );
    }
  };

  return buildFieldError();
};

export default FieldError;