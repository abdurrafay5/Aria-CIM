/**
 *
 * PrivateRoute
 * Higher Order Component that blocks navigation when the user is not logged in
 * and redirect the user to login page
 *
 * Wrap your protected routes to secure your container
 */

import AppWrapper from "../AppWrapper";

import * as React from 'react';
import { Redirect, Route } from 'react-router';

import auth from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={props =>
      auth.getToken() !== null ? (
        <AppWrapper>
          <Component {...props} />
        </AppWrapper>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;