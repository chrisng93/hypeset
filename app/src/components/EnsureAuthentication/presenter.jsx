import React, { Component, PropTypes as T } from 'react';
import Nav from '../Nav';

const propTypes = {
  isAuthenticated: T.boolean.isRequired,
  children: T.node.isRequired,
  routeToSignIn: T.func.isRequired,
};

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

EnsureAuthentication.propTypes = propTypes;
