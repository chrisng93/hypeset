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
  getAllBrands: T.func.isRequired,
  getAllNews: T.func.isRequired,
  getAllSales: T.func.isRequired,
  getUserBrands: T.func.isRequired,
  getOwnNews: T.func.isRequired,
  getOwnSales: T.func.isRequired,
  onLogout: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
};

function AppContainer(props) {
  const { children, isAuthenticated, token, pathname, getAllBrands, getAllNews, getAllSales,
    getUserBrands, getOwnNews, getOwnSales, onLogout, routeToNews, routeToSales, routeToProfile, routeToSignIn } = props;
  const navProps = { isAuthenticated, token, pathname, onLogout, routeToNews, routeToSales, routeToProfile, routeToSignIn };
  if (isAuthenticated) {
    getUserBrands({ token });
    getOwnNews({ token, offset: 0 });
    getOwnSales({ token, offset: 0 });
  } else {
    getAllNews({ offset: 0 });
    getAllSales({ offset: 0 });
  }
  getAllBrands();
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

function mapDispatchToProps(dispatch) {
  return {
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
    getAllNews: bindActionCreators(actions.getAllNews, dispatch),
    getAllSales: bindActionCreators(actions.getAllSales, dispatch),
    getUserBrands: bindActionCreators(actions.getUserBrands, dispatch),
    getOwnNews: bindActionCreators(actions.getOwnNews, dispatch),
    getOwnSales: bindActionCreators(actions.getOwnSales, dispatch),
    onLogout: bindActionCreators(actions.logout, dispatch),
    routeToSignIn: () => dispatch(push('/signin')),
    routeToNews: () => dispatch(push('/news')),
    routeToSales: () => dispatch(push('/sales')),
    routeToProfile: () => dispatch(push('/profile')),
  };
}

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
