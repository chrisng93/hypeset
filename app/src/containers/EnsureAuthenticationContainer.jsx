import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import { pathnameSelector } from '../selectors/routingSelectors';
import EnsureAuthentication from '../components/EnsureAuthentication';

const propTypes = {
  children: T.node.isRequired,
  isAuthenticated: T.bool.isRequired,
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
  return {};
}

EnsureAuthenticationContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticationContainer);
