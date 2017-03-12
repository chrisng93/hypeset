import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import SignUp from './presenter';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    onSignUp: bindActionCreators(actions.signUp, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
