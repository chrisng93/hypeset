import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { tokenSelector } from '../../selectors/userSelectors';
import { salesSelector, salesBrandsSelector, salesSitesSelector } from '../../selectors/salesSelectors';
import Sales from './presenter';

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    sales: salesSelector(state),
    salesBrands: salesBrandsSelector(state),
    salesSites: salesSitesSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSales: bindActionCreators(actions.getSales, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sales);
