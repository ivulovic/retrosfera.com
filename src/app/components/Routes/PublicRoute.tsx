import { Fragment } from 'react';
import { Route } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  layout: Layout = Fragment,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default PublicRoute;
