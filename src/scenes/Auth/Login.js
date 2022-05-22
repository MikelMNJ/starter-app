import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'helpers/stateHelpers';
import { buildClasses } from 'helpers/utilityHelpers';
import { isEmpty } from 'lodash';
import { Formik, Form, Field } from 'formik';
import authActions from 'modules/auth/authActions';
import authSelectors from 'modules/auth/authSelectors';
import Checkbox from 'components/Checkbox/Checkbox';
import FieldError from 'components/FieldError/FieldError';
import FieldWithAction from 'components/FieldWithAction/FieldWithAction';
import Button from 'components/Button/Button';
import moment from 'moment';
import jwt_decode from 'jwt-decode';
import * as yup from "yup";
import 'theme/authForm.scss';

const defaults = {
  email: "",
  password: "",
  trustedDevice: false,
};

const schema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.').trim(),
  password: yup.string().required('Password is required.').trim(),
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
  const login = useCallback((payload, callback) =>
    dispatch(authActions.login(payload, callback)), [dispatch]);
  const userInfo = useSelector(state => authSelectors.userInfo(state));
  const token = userInfo?.token;
  const expires = !isEmpty(token) && moment(jwt_decode(token).exp * 1000);
  const isValid = expires > moment();

  useEffect(() => {
    const route = !isEmpty(state) ? state.from.pathname + state.from.search : "/";
    if (isValid) navigate(route);
  }, [token, isValid, navigate, state]);

  const handleSubmit = (values, setSubmitting) => {
    const { email, password, trustedDevice } = values;

    const callback = () => setSubmitting(false);

    const payload = {
      email: email.toLowerCase(),
      password,
      trustedDevice,
    };

    login(payload, callback);
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
            <Field type="email" name="email" placeholder="Email*" />
            <FieldError name="email" />

            <FieldWithAction
              form={form}
              name="password"
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

            <p className="authOptions">
              <Link to={'/create-account'}>Create account</Link>
              &nbsp;or <Link to={'/reset-password'}>Reset password</Link>.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;