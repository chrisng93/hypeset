import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import EditBrands from './presenter';

function mapStateToProps(state) {
  const brandState = state.brand.toJS();
  const userState = state.user.toJS();
  return {
    allBrands: brandState.allBrands,
    userBrands: brandState.userBrands,
    token: userState.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
    getUserBrands: bindActionCreators(actions.getUserBrands, dispatch),
    addBrand: bindActionCreators(actions.addBrand, dispatch),
    removeBrand: bindActionCreators(actions.removeBrand, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBrands);
