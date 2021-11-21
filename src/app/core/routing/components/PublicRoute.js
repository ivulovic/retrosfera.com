import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

const PublicRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

PublicRoute.propTypes = {
  component: PropTypes.PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  layout: PropTypes.PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

export default PublicRoute;
