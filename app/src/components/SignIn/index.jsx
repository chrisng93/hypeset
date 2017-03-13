import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import * as actions from '../../actions';
import SignIn from './presenter';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: bindActionCreators(actions.auth, dispatch),
    routeToSignUp: () => dispatch(push('/signup')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
