import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector } from '../../selectors/userSelectors';
import EnsureAuthentication from './presenter';

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    routeToSignIn: () => dispatch(push('/signin')),
    currentURL: ownProps.location.pathname,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthentication);
