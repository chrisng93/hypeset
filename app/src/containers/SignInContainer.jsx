import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import * as actions from '../actions';
import SignIn from '../components/SignIn';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  onAuth: T.func.isRequired,
  routeToSignUp: T.func.isRequired,
  routeToNews: T.func.isRequired,
};

function SignInContainer(props) {
  return (
    <SignIn {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch),
    routeToSignUp: () => dispatch(push('/signup')),
    routeToNews: () => dispatch(push('/news')),
  };
}

SignInContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
