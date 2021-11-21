import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { defaultRedirectRouteForPrivateRouter } from 'settings';

import { iff } from 'utils/iff';

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  isAuthenticated,
  isAuthReady,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      // console.log({privateProps: props})
      return isAuthenticated ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        iff(
          isAuthReady,
          <Redirect
            to={{
              pathname: defaultRedirectRouteForPrivateRouter,
              state: { from: props.location },
            }}
          />,
          null,
        )
      );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  layout: PropTypes.PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  isAuthenticated: PropTypes.bool,
  isAuthReady: PropTypes.bool,
  location: PropTypes.any,
};

export default PrivateRoute;
