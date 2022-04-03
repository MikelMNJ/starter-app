import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'helpers/stateHelpers';
import { buildClasses } from 'helpers/utilityHelpers';
import { isEmpty } from 'lodash';
import { Formik, Form, Field } from 'formik';
import authActions from 'slices/auth/authActions';
import authSelectors from 'slices/auth/authSelectors';
import Checkbox from 'components/Checkbox/Checkbox';
import FieldError from 'components/FieldError/FieldError';
import FieldWithAction from 'components/FieldWithAction/FieldWithAction';
import Button from 'components/Button/Button';
import * as yup from "yup";
import 'theme/authForm.scss';

const defaults = {
  userEmail: "",
  userPassword: "",
  trustedDevice: false,
};

const schema = yup.object().shape({
  userEmail: yup.string().email('Invalid email.').required('Email is required.').trim(),
  userPassword: yup.string().required('Password is required.').trim(),
});

const Login = props => {
  const { className, ...rest } = props;

  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const classes = [
    { condition: className, name: className },
    { condition: true, name: "authContainer" },
  ];

  // Actions and Selectors
  const login = useCallback((payload, callback) => dispatch(authActions.login(payload, callback)), [dispatch]);
  const userInfo = useSelector(state => authSelectors.userInfo(state));
  const token = userInfo?.token;
  const validToken = !isEmpty(token);

  useEffect(() => {
    const route = !isEmpty(state) ? state.from.pathname + state.from.search : "/";
    if (validToken) navigate(route);
  }, [token, validToken, navigate, state]);

  const handleSubmit = (values, setSubmitting) => {
    const { userEmail, userPassword, trustedDevice } = values;

    const callback = () => setSubmitting(false);

    const payload = {
      email: userEmail.toLowerCase(),
      password: userPassword,
      trustedDevice,
    };

    login(payload, callback);
  };

  return (
    <div className={buildClasses(classes, "login")}>
      <Formik
        initialValues={defaults}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values, setSubmitting)}
        {...rest}
      >
        {form => (
          <Form className="authForm">
            <Field type="email" name="userEmail" placeholder="Email*" />
            <FieldError name="userEmail" />

            <FieldWithAction
              form={form}
              name="userPassword"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password*"
              activeIcon={passwordVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              inactiveIcon="fa-solid fa-eye-slash"
              highlightField={true}
              callback={() => setPasswordVisible(!passwordVisible)} />

            <Button
              type="submit"
              text="Log in"
              btnType="solid"
              disabled={form.isSubmitting} />

            <Checkbox
              name="trustedDevice"
              className="trust"
              label="Trust this device for 30 days." />

            <p className="loginOptions">
              <Link to={'/create-account'}>Create an account</Link>
              &nbsp;or <Link to={'/reset-password'}>Reset your password</Link>.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;