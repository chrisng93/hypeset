import React, { Component, PropTypes as T } from 'react';
import Nav from './Nav';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  pathname: T.string.isRequired,
  children: T.node,
  getUserBrands: T.func.isRequired,
  getNews: T.func.isRequired,
  getSales: T.func.isRequired,
  routeToSignIn: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
};

export default class EnsureAuthentication extends Component {
  componentWillMount() {
    const { isAuthenticated, token, routeToSignIn, getUserBrands, getNews, getSales } = this.props;
    if (!isAuthenticated) {
      return routeToSignIn();
    }
    getUserBrands({ token });
    getNews({ token, offset: 0 });
    getSales({ token, offset: 0 });
  }

  render() {
    const { isAuthenticated, pathname, children, routeToNews, routeToSales, routeToProfile } = this.props;
    const navProps = { pathname, routeToNews, routeToSales, routeToProfile };
    if (isAuthenticated) {
      return (
        <div className="container">
          <Nav {...navProps} />
          {children}
        </div>
      );
    }
    return null;
  }
}

EnsureAuthentication.propTypes = propTypes;
