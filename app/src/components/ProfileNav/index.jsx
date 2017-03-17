import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import ProfileNav from './presenter';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    routeToEditUser: () => dispatch(push('/profile/edit')),
    routeToEditBrands: () => dispatch(push('/profile/brands')),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNav);
