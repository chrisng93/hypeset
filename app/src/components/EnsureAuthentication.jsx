import React, { Component, PropTypes as T } from 'react';
import Nav from './Nav';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  children: T.node,
  routeToSignIn: T.func.isRequired,
  routeToNews: T.func.isRequired,
  routeToSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
};

export default class EnsureAuthentication extends Component {
  componentWillMount() {
    const { isAuthenticated, routeToSignIn } = this.props;
    if (!isAuthenticated) {
      routeToSignIn();
    }
  }

  render() {
    const { isAuthenticated, children, routeToNews, routeToSales, routeToProfile } = this.props;
    const navProps = { routeToNews, routeToSales, routeToProfile };
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
