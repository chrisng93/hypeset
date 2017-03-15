import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { userSelector, tokenSelector } from '../../selectors/userSelectors';
import * as actions from '../../actions';
import EditUser from './presenter';

function mapStateToProps(state) {
  return {
    user: userSelector(state),
    token: tokenSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onEditUser: bindActionCreators(actions.editUser, dispatch),
    routeToProfile: () => dispatch(push('/profile')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
