import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  children: T.node.isRequired,
  isAuthenticated: T.bool.isRequired,
  rehydrated: T.bool.isRequired,
  routeToNews: T.func.isRequired,
};

export default class EnsureAuthentication extends Component {
  componentWillMount() {
    const { isAuthenticated, rehydrated, routeToNews } = this.props;
    if (!isAuthenticated && rehydrated) {
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
