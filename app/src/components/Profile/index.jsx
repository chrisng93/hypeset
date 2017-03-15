import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { userSelector } from '../../selectors/userSelectors'
import Profile from './presenter';

function mapStateToProps(state) {
  return {
    user: userSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToEditUser: () => dispatch(push('/profile/edit')),
    routeToEditBrands: () => dispatch(push('/profile/brands')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
