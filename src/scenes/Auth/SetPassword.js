import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'helpers/stateHelpers';
import { buildClasses } from 'helpers/utilityHelpers';
import { paramsToObject } from 'helpers/paramHelpers';
import { Formik, Form } from 'formik';
import authActions from 'slices/auth/authActions';
import Checkbox from 'components/Checkbox/Checkbox';
import FieldReqs from 'components/FieldReqs/FieldReqs';
import FieldWithAction from 'components/FieldWithAction/FieldWithAction';
import Button from 'components/Button/Button';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import * as yup from "yup";
import 'theme/authForm.scss';

const defaults = {
  password: "",
  confirmPassword: "",
  trustedDevice: false,
};

const schema = yup.object().shape({
  password: yup.string().required('Password is required.').trim(),
  confirmPassword: yup.string().required('Confirm password is required.').trim()
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

const ResetPassword = props => {
  const { className, ...rest } = props;

  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const { search } = useLocation();
  const resetToken = paramsToObject(search).token;
  const expires = resetToken && moment(jwt_decode(resetToken).exp * 1000);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = [
    { condition: className, name: className },
    { condition: true, name: "authContainer" },
  ];

  // Actions and Selectors
  const updateUser = useCallback((payload, callback) =>
    dispatch(authActions.updateUser(payload, callback)), [dispatch]);

  const handleSubmit = (values, setSubmitting) => {
    const { password, confirmPassword, trustedDevice } = values;
    const validAtSubmit = expires >= moment();
    const callback = () => navigate('/');

    const payload = {
      password,
      confirmPassword,
      trustedDevice,
      token: resetToken,
    };

    if (resetToken && !validAtSubmit) {
      return navigate(`/reset-password${search}`);
    }

    updateUser(payload, callback);
    setSubmitting(false);
  };

  return (
    <div className={buildClasses(classes)}>
      <Formik
        initialValues={defaults}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        {...rest}
        >
        {form => (
          <Form className="authForm">
            {!resetToken && (
              <div className="expiredMsg">
                <h3>No token present.</h3>
                <p>Please click the link sent in the email.</p>
              </div>
            )}

            <FieldWithAction
              form={form}
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="New password*"
              activeIcon={passwordVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              inactiveIcon="fa-solid fa-eye-slash"
              highlightField={true}
              disabled={!resetToken}
              callback={() => setPasswordVisible(!passwordVisible)} />

            <FieldWithAction
              form={form}
              name="confirmPassword"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Confirm new password*"
              activeIcon={passwordVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              inactiveIcon="fa-solid fa-eye-slash"
              highlightField={true}
              disabled={!resetToken}
              callback={() => setPasswordVisible(!passwordVisible)} />

            <Button
              type="submit"
              text="Submit"
              btnType="solid"
              disabled={form.isSubmitting || !resetToken} />

            <FieldReqs
              value={form.values["password"]}
              upper
              lower
              number
              min
              special
            />

            <Checkbox
              name="trustedDevice"
              className="trust"
              disabled={!resetToken}
              label="Trust this device for 30 days." />

            <p className="authOptions">
              <Link to={'/login'}>Log in</Link>
              &nbsp;or <Link to={'/create-account'}>Create account</Link>.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;