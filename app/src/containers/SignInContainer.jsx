import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector, userErrorSelector } from '../selectors/userSelectors';
import * as actions from '../actions';
import { resetNews } from '../actions/newsActions';
import { resetSales } from '../actions/salesActions';
import SignIn from '../components/SignIn';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  error: T.object,

  onAuth: T.func.isRequired,
  routeToSignUp: T.func.isRequired,
  routeToNews: T.func.isRequired,
  resetNews: T.func.isRequired,
  resetSales: T.func.isRequired,
};

function SignInContainer(props) {
  return (
    <SignIn {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    error: userErrorSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch),
    routeToSignUp: () => dispatch(push('/signup')),
    routeToNews: () => dispatch(push('/news')),
    resetNews: () => dispatch(resetNews()),
    resetSales: () => dispatch(resetSales()),
  };
}

SignInContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
