import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import { pathnameSelector } from '../selectors/routingSelectors';
import EnsureAuthentication from '../components/EnsureAuthentication';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  children: T.node,
  routeToSignIn: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
};

function EnsureAuthenticationContainer(props) {
  return(
    <EnsureAuthentication {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    currentLocation: pathnameSelector(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    routeToSignIn: () => dispatch(push('/signin')),
    currentURL: ownProps.location.pathname,
    routeToNews: () => dispatch(push('/news')),
    routeToSales: () => dispatch(push('/sales')),
    routeToProfile: () => dispatch(push('/profile')),
    onLogout: () => dispatch(push('/signin')),
    // onLogout: bindActionCreators(actions.logout, dispatch),
  };
}

EnsureAuthenticationContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticationContainer);
