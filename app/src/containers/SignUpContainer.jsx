import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector, userErrorSelector } from '../selectors/userSelectors';
import * as actions from '../actions';
import { resetNews } from '../actions/newsActions';
import { resetSales } from '../actions/salesActions';
import SignUp from '../components/SignUp';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  error: T.object,

  onSignUp: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
  routeToNews: T.func.isRequired,
  resetNews: T.func.isRequired,
  resetSales: T.func.isRequired,
};

function SignUpContainer(props) {
  return (
    <SignUp {...props} />
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
    onSignUp: bindActionCreators(actions.signUp, dispatch),
    routeToSignIn: () => dispatch(push('/signin')),
    routeToNews: () => dispatch(push('/news')),
    resetNews: () => dispatch(resetNews()),
    resetSales: () => dispatch(resetSales()),
  };
}

SignUpContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
