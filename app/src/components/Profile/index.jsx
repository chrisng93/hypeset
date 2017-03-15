import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { toJS } from 'immutable';
import Profile from './presenter';

function mapStateToProps(state) {
  const userState = state.user.toJS();
  return {
    user: userState.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToEditUser: () => dispatch(push('/profile/edit')),
    routeToEditBrands: () => dispatch(push('/profile/brands')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
