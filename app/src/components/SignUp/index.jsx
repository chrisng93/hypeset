import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../../actions';
import SignUp from './presenter';

function mapStateToProps(state) {
  const userState = state.user.toJS();
  return {
    isAuthenticated: userState.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignUp: bindActionCreators(actions.signUp, dispatch),
    routeToNews: () => dispatch(push('/news')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
