import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import EnsureAuthentication from '../components/EnsureAuthentication';

const propTypes = {
  children: T.node.isRequired,
  isAuthenticated: T.bool.isRequired,
  routeToSignIn: T.func.isRequired,
};

function EnsureAuthenticationContainer(props) {
  return(
    <EnsureAuthentication {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToSignIn: () => dispatch(push('/signin')),
  };
}

EnsureAuthenticationContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticationContainer);
