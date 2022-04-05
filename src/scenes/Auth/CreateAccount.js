import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'helpers/stateHelpers';
import { buildClasses } from 'helpers/utilityHelpers';
import { isEmpty } from 'lodash';
import { Formik, Form, Field } from 'formik';
import authActions from 'slices/auth/authActions';
import authSelectors from 'slices/auth/authSelectors';
import Checkbox from 'components/Checkbox/Checkbox';
import FieldReqs from 'components/FieldReqs/FieldReqs';
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
  confirmPassword: "",
  trustedDevice: false,
};

const schema = yup.object().shape({
  email: yup.string().email('Invalid email.').required('Email is required.').trim(),
  password: yup.string().required('Password is required.').trim(),
  confirmPassword: yup.string().required('Confirm password is required.').trim()
    .oneOf([yup.ref('password'), null], 'Passwords must match.'),
});

const CreateAccount = props => {
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
  const createUser = useCallback((payload, callback) =>
    dispatch(authActions.createUser(payload, callback)), [dispatch]);
  const userInfo = useSelector(state => authSelectors.userInfo(state));
  const token = userInfo?.token;
  const expires = !isEmpty(token) && moment(jwt_decode(token).exp * 1000);
  const isValid = expires > moment();

  useEffect(() => {
    const route = !isEmpty(state) ? state.from.pathname + state.from.search : "/";
    if (isValid) navigate(route);
  }, [token, isValid, navigate, state]);

  const handleSubmit = (values, setSubmitting) => {
    const { email, password, confirmPassword, trustedDevice } = values;

    const callback = () => setSubmitting(false);

    const payload = {
      email,
      password,
      confirmPassword,
      trustedDevice,
    };

    createUser(payload, callback);
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

            <FieldWithAction
              form={form}
              name="confirmPassword"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Confirm password*"
              activeIcon={passwordVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
              inactiveIcon="fa-solid fa-eye-slash"
              highlightField={true}
              callback={() => setPasswordVisible(!passwordVisible)} />

            <Button
              type="submit"
              text="Submit"
              btnType="solid"
              disabled={form.isSubmitting} />

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
              label="Trust this device for 30 days." />

            <p className="authOptions">
              <Link to={'/login'}>Log in</Link>
              &nbsp;or <Link to={'/reset-password'}>Reset password</Link>.
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAccount;