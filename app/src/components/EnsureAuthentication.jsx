import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  children: T.node.isRequired,
  isAuthenticated: T.bool.isRequired,
};

export default class EnsureAuthentication extends Component {
  componentWillMount() {
    const { isAuthenticated, routeToSignIn } = this.props;
    if (!isAuthenticated) {
      return routeToSignIn();
    }
  }

  render() {
    const { isAuthenticated, children } = this.props;
    if (isAuthenticated) {
      return (
        <div className="container">
          {children}
        </div>
      );
    }
    return null;
  }
}

EnsureAuthentication.propTypes = propTypes;
