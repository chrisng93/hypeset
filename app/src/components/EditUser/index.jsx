import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditUser from './presenter';
import * as actions from '../../actions';

function mapStateToProps(state) {
  const userState = state.user.toJS();
  return {
    user: userState.user,
    token: userState.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEditUser: bindActionCreators(actions.editUser, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
