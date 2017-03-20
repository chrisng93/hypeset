/**
 * Created by chrisng on 3/20/17.
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import { pathnameSelector } from '../selectors/routingSelectors';
import Nav from '../components/Nav';

const propTypes = {
  children: T.node.isRequired,
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  pathname: T.string.isRequired,
  getUserBrands: T.func.isRequired,
  getNews: T.func.isRequired,
  getSales: T.func.isRequired,
  onLogout: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
};

function AppContainer(props) {
  const { children, token, pathname, getUserBrands, getAllBrands, getNews, getSales, onLogout, routeToNews, routeToSales, routeToProfile } = props;
  const navProps = { token, pathname, onLogout, routeToNews, routeToSales, routeToProfile };
  getUserBrands({ token });
  getAllBrands({ token });
  getNews({ token, offset: 0 });
  getSales({ token, offset: 0 });
  return (
    <div id="app">
      <Nav {...navProps} />
      {children}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    token: tokenSelector(state),
    pathname: pathnameSelector(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getUserBrands: bindActionCreators(actions.getUserBrands, dispatch),
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
    getNews: bindActionCreators(actions.getNews, dispatch),
    getSales: bindActionCreators(actions.getSales, dispatch),
    onLogout: bindActionCreators(actions.logout, dispatch),
    routeToSignIn: () => dispatch(push('/signin')),
    routeToNews: () => dispatch(push('/news')),
    routeToSales: () => dispatch(push('/sales')),
    routeToProfile: () => dispatch(push('/profile')),
  };
}

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
