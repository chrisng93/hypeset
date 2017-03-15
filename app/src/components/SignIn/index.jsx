import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { isAuthenticatedSelector } from '../../selectors/userSelectors';
import * as actions from '../../actions';
import SignIn from './presenter';

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch),
    routeToSignUp: () => dispatch(push('/signup')),
    routeToNews: () => dispatch(push('/news')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
