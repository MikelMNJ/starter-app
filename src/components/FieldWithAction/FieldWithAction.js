import React, { useRef } from 'react';
import { useDispatch } from 'helpers/stateHelpers';
import { iconValid } from 'helpers/validators';
import { Field } from 'formik';
import appActions from 'slices/app/appActions';
import FieldError from 'components/FieldError/FieldError';
import Button from 'components/Button/Button';
import './FieldWithAction.scss';

/* Validate with parent yup schema:
*  const schema = yup.object().shape({
*    [fieldName]: yup.string().required().trim()
*  });
*/

const FieldWithAction = props => {
  const {
    form,
    name,
    type,
    validate,
    placeholder,
    activeIcon,
    inactiveIcon,
    message,
    highlightFeedback,
    callback,
    disabled,
  } = props;
  const dispatch = useDispatch();
  const fieldRef = useRef();

  // Actions
  const addNotification = payload => dispatch(appActions.addNotification(payload));

  const confirmAction = target => {
    const confirmed = 'actionConfirmed';
    target.classList.add(confirmed);
    setTimeout(() => target.classList.remove(confirmed), 200);
  };

  const handleClick = e => {
    e?.preventDefault();
    const target = fieldRef.current;

    if (form.values[name] !== '') {
      if (highlightFeedback) confirmAction(target);
      if (message) addNotification({ message, type: "success" });
      if (callback) callback();
    };
  };

  return (
    <label>
      <div className="fieldWithAction">
        <Field name={name} validate={validate}>
          {({ field }) => {
            return (
              <input
                ref={fieldRef}
                type={type || "text"}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
              />
            );
          }}
        </Field>

        <Button
          type="button"
          btnType="solid"
          icon={form.values[name] !== ''
            ? iconValid(activeIcon)
            : iconValid(inactiveIcon)
          }
          disabled={disabled}
          callback={handleClick}
        />
      </div>

      <FieldError name={name} />
    </label>
  );
};

export default FieldWithAction;