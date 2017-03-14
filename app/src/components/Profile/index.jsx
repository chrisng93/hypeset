import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { toJS } from 'immutable';
import Profile from './presenter';

function mapStateToProps(state) {
  console.log(state.user, state.user.user)
  return {
    user: state.user.toJS().user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToEditUser: () => dispatch(push('/profile/edit')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
