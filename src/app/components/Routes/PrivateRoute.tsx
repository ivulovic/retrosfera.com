import { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { defaultRedirectRouteForPrivateRouter } from 'settings';

import { iff } from 'utils/iff';

const PrivateRoute = ({
  component: Component,
  layout: Layout = Fragment,
  isAuthenticated,
  isAuthReady,
  ...rest
}: any) => (
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

export default PrivateRoute;
