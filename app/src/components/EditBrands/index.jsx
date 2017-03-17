import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { userBrandsSelector, availableBrandsSelector, brandsByPopularitySelector } from '../../selectors/brandSelectors';
import { tokenSelector } from '../../selectors/userSelectors';
import EditBrands from './presenter';

function mapStateToProps(state) {
  console.log(brandsByPopularitySelector(state))
  return {
    availableBrands: availableBrandsSelector(state),
    userBrands: userBrandsSelector(state),
    popularBrands: brandsByPopularitySelector(state),
    token: tokenSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
    getUserBrands: bindActionCreators(actions.getUserBrands, dispatch),
    getBrandsByPopularity: bindActionCreators(actions.getBrandsByPopularity, dispatch),
    addBrand: bindActionCreators(actions.addBrand, dispatch),
    removeBrand: bindActionCreators(actions.removeBrand, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBrands);
