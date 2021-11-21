import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { defaultRedirectRouteForOnlyPublicRouter } from 'settings';

import { iff } from 'utils/iff';

const OnlyPublicRoute = ({
  component: Component,
  layout: Layout,
  isAuthenticated,
  isAuthReady,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      return !isAuthenticated ? (
        <Layout>
          <Component {...props} />
        </Layout>
      ) : (
        iff(
          isAuthReady,
          <Redirect
            to={{
              pathname: defaultRedirectRouteForOnlyPublicRouter,
              state: { from: props.location },
            }}
          />,
          null,
        )
      );
    }}
  />
);

OnlyPublicRoute.propTypes = {
  component: PropTypes.PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  layout: PropTypes.PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  isAuthenticated: PropTypes.bool,
  isAuthReady: PropTypes.bool,
  location: PropTypes.any,
};

export default OnlyPublicRoute;
