import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import EnsureAuthentication from '../components/EnsureAuthentication';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  children: T.node.isRequired,
  getUserBrands: T.func.isRequired,
  getNews: T.func.isRequired,
  getSales: T.func.isRequired,
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
    token: tokenSelector(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getUserBrands: bindActionCreators(actions.getUserBrands, dispatch),
    getNews: bindActionCreators(actions.getNews, dispatch),
    getSales: bindActionCreators(actions.getSales, dispatch),
    // TODO: onLogout: bindActionCreators(actions.logout, dispatch),
    onLogout: () => dispatch(push('/signin')),
    routeToSignIn: () => dispatch(push('/signin')),
    routeToNews: () => dispatch(push('/news')),
    routeToSales: () => dispatch(push('/sales')),
    routeToProfile: () => dispatch(push('/profile')),
  };
}

EnsureAuthenticationContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticationContainer);
