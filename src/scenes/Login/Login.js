import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'helpers/stateHelpers';
import { buildClasses } from 'helpers/utilityHelpers';
import { isEmpty } from 'lodash';
import { Formik, Form, Field } from 'formik';
import appActions from 'slices/app/appActions';
import appSelectors from 'slices/app/appSelectors';
import Checkbox from 'components/Checkbox/Checkbox';
import FieldError from 'components/FieldError/FieldError';
import FieldWithAction from 'components/FieldWithAction/FieldWithAction';
import Button from 'components/Button/Button';
import colors from 'theme/colors.scss';
import * as yup from "yup";

const defaults = {
  userEmail: '',
  userPassword: '',
  trustedDevice: false,
};

const schema = yup.object().shape({
  userEmail: yup.string().email('Invalid email.').required('Email is required.').trim(),
  userPassword: yup.string().required('Password is required.').trim(),
});

const Login = props => {
  const { className, ...rest } = props;

  const [ passwordVisible, setPasswordVisible ] = useState(false);
  const [ loggedIn, setLoggedIn ] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const classes = [
    { condition: className, name: className },
  ];

  // Selectors
  const token = useSelector(state => appSelectors.userToken(state));

  // Actions
  const login = useCallback((payload, callback) => dispatch(appActions.login(payload, callback)), [dispatch]);

  useEffect(() => {
    if (!!token) setLoggedIn(true);
  }, [token, setLoggedIn]);

  useEffect(() => {
    const route = !isEmpty(state) ? state.from.pathname + state.from.search : "/";
    if (!!token) navigate(route);
  }, [loggedIn]);

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
    <Formik
      className={buildClasses(classes, "login")}
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
  );
};

export default Login;