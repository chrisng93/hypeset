import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { userBrandsSelector, availableBrandsSelector } from '../../selectors/brandSelectors';
import { tokenSelector } from '../../selectors/userSelectors';
import EditBrands from './presenter';

function mapStateToProps(state) {
  return {
    availableBrands: availableBrandsSelector(state),
    userBrands: userBrandsSelector(state),
    token: tokenSelector(state),
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
