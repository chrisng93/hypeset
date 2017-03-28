import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  children: T.node.isRequired,
  isAuthenticated: T.bool.isRequired,
  routeToNews: T.func.isRequired,
};

export default class EnsureAuthentication extends Component {
  componentWillMount() {
    const { isAuthenticated, routeToNews } = this.props;
    if (!isAuthenticated) {
      return routeToNews();
    }
  }

  render() {
    const { isAuthenticated, children } = this.props;
    if (isAuthenticated) {
      return (
        <div>
          {children}
        </div>
      );
    }
    return null;
  }
}

EnsureAuthentication.propTypes = propTypes;

// have listener for rehydrate, have ensure auth only route to news if not authenticated and rehydrate is true
// have app return null if rehydrate false
// have app only get data when rehydrate is true
