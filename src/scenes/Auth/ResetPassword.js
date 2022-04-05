import React, { useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'helpers/stateHelpers';
import { buildClasses } from 'helpers/utilityHelpers';
import { Formik, Form, Field } from 'formik';
import authActions from 'slices/auth/authActions';
import FieldError from 'components/FieldError/FieldError';
import Button from 'components/Button/Button';
import jwt_decode from "jwt-decode";
import moment from 'moment';
import * as yup from "yup";
import 'theme/authForm.scss';

const defaults = { email: "" };

const schema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.').trim(),
});

const ResetPassword = props => {
  const { className, ...rest } = props;
  const [ searchParams, setSearchParams ] = useSearchParams();

  const dispatch = useDispatch();
  const resetToken = searchParams.get("token");
  const expires = resetToken && moment(jwt_decode(resetToken).exp * 1000);
  const isValid = expires >= moment();
  const expired = resetToken && !isValid;
  const classes = [
    { condition: className, name: className },
    { condition: true, name: "authContainer" },
  ];

  // Actions and Selectors
  const sendResetEmail = useCallback((payload, callback) =>
  dispatch(authActions.sendResetEmail(payload, callback)), [dispatch]);

  const handleSubmit = (values, setSubmitting) => {
    const { email } = values;
    const payload = { email };

    const callback = () => {
      if (expired) {
        searchParams.delete("token");
        setSearchParams(searchParams);
      }

      setSubmitting(false)
    };

    sendResetEmail(payload, callback);
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
            {resetToken && expired && (
              <div className="expiredMsg">
                <h3>This request has expired.</h3>
                <p>Please try again.</p>
              </div>
            )}

            <Field type="email" name="email" placeholder="Email*" />
            <FieldError name="email" />

            <Button
              type="submit"
              text="Submit"
              btnType="solid"
              disabled={form.isSubmitting} />

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