import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { toJS } from 'immutable';
import { push } from 'react-router-redux';

class AuthenticatedComponent extends React.Component {
  componentWillMount() {
    const { isAuthenticated, routeToSignIn } = this.props;
    console.log('AUTHENTICATED', isAuthenticated)
    if (!isAuthenticated) {
      routeToSignIn();
    }
  }

  componentWillReceiveProps() {
    console.log('receiving props')
  }

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return this.props.children;
    }
    return null;
  }
}

AuthenticatedComponent.propTypes = {
  isAuthenticated: T.boolean,
  routeToSignIn: T.func,
  children: T.node,
};

function mapStateToProps(state) {
  const user = state.user.toJS();
  return {
    isAuthenticated: user.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    routeToSignIn: () => dispatch(push('/signin')),
    currentURL: ownProps.location.pathname,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);
