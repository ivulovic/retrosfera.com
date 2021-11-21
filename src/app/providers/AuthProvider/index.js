/**
 *
 * AuthProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import reducer from './reducer';
import saga from './saga';

import { initAuth } from './actions';
import { stateName } from './selectors';

function AuthProvider(props) {
  useInjectReducer({ key: stateName, reducer: reducer });
  useInjectSaga({ key: stateName, saga: saga });
  React.useEffect(() => {
    const { initializeAuth } = props;
    initializeAuth();
  }, [props]);

  return <div />;
}

AuthProvider.propTypes = {
  initializeAuth: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    initializeAuth: () => {
      dispatch(initAuth());
    },
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(AuthProvider);
