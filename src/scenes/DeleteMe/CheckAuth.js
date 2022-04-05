/* eslint-disable react-hooks/exhaustive-deps */

import React, { Fragment, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'helpers/stateHelpers';
import { isEmpty } from 'lodash';
import authActions from 'slices/auth/authActions';
import authSelectors from 'slices/auth/authSelectors';
import Status from 'components/Status/Status';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import colors from 'theme/colors.scss';

const { REACT_APP_DEMO_CREDENTIALS: demo } = process.env;

export const CheckAuth = props => {
  const dispatch = useDispatch();

  // Actions and Selectors
  const login = useCallback((payload, callback) =>
    dispatch(authActions.login(payload, callback)), [dispatch]);
  const userInfo = useSelector(state => authSelectors.userInfo(state));
  const tokenName = useSelector(state => authSelectors.tokenName(state));

  const existingToken = localStorage.getItem(tokenName);
  const token = existingToken || userInfo?.token;
  const expires = !isEmpty(token) && moment(jwt_decode(token).exp * 1000);
  const isValid = expires > moment();
  const expired = !isEmpty(token) && !isValid;

  useEffect(() => {
    if (demo && (expired || !token)) {
      const { email, password } = JSON.parse(demo);
      const payload = { email, password };
      login(payload);
    }
  }, [expired, token]);

  return (
    <Fragment>
      <Status color={token && isValid ? colors.green : (token ? colors.yellow : colors.red)} text={
        <p>
          <strong>
            Authentication {token && isValid ? "successful" : "failed"}
          </strong>:<br />

          Token {token && isValid ? "valid" : (token ? "expired" : "not found")}.
        </p>
      } />
    </Fragment>
  );
};

export default CheckAuth;