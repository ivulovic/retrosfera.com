import { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { defaultRedirectRouteForOnlyPublicRouter } from 'settings';

import { iff } from 'utils/iff';

const OnlyPublicRoute = ({
  component: Component,
  layout: Layout = Fragment,
  isAuthenticated,
  isAuthReady,
  ...rest
}: any) => (
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

export default OnlyPublicRoute;
