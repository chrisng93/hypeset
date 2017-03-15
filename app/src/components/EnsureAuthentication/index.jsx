import { connect } from 'react-redux';
import { toJS } from 'immutable';
import { push } from 'react-router-redux';
import EnsureAuthentication from './presenter';

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

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthentication);
