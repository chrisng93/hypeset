import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import * as actions from '../actions';
import SignUp from '../components/SignUp';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  onSignUp: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
};

function SignUpContainer(props) {
  return (
    <SignUp {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignUp: bindActionCreators(actions.signUp, dispatch),
    routeToNews: () => dispatch(push('/news')),
    routeToSignIn: () => dispatch(push('/signin')),
  };
}

SignUpContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
