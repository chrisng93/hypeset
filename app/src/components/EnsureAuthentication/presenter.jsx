import React, { Component, PropTypes as T } from 'react';
import Nav from '../Nav';

export default class EnsureAuthentication extends Component {
  componentWillMount() {
    const { isAuthenticated, routeToSignIn } = this.props;
    if (!isAuthenticated) {
      routeToSignIn();
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <div className="container">
          <Nav />
          {this.props.children}
        </div>
      );
    }
    return null;
  }
}

EnsureAuthentication.propTypes = {
  isAuthenticated: T.boolean,
  routeToSignIn: T.func,
  children: T.node,
};
