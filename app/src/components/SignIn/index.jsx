import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { toJS } from 'immutable';

import * as actions from '../../actions';
import SignIn from './presenter';

function mapStateToProps(state) {
  const userState = state.user.toJS();
  return {
    isAuthenticated: userState.isAuthenticated,
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
