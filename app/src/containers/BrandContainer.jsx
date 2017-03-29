import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { brandNameSelector, brandCondensedNameSelector, brandNewsSelector, brandSalesSelector, isFetchingBrandInfosSelector } from '../selectors/brandSelectors';
import Brand from '../components/Brand';

const propTypes = {
  brandName: T.string,
  brandCondensedName: T.string,
  brandNews: T.array.isRequired,
  brandSales: T.array.isRequired,
  isFetchingBrandInfos: T.bool,
  getBrandInfos: T.func,
  resetBrandInfos: T.func,
};

class BrandContainer extends Component {
  componentWillMount() {
    console.log('mounting')
    this.props.resetBrandInfos();
  }

  render() {
    return (
      <Brand {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    brandName: brandNameSelector(state),
    brandCondensedName: brandCondensedNameSelector(state),
    brandNews: brandNewsSelector(state),
    brandSales: brandSalesSelector(state),
    isFetchingBrandInfos: isFetchingBrandInfosSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBrandInfos: bindActionCreators(actions.getBrandInfos, dispatch),
    resetBrandInfos: bindActionCreators(actions.resetBrandInfos, dispatch),
  };
}

BrandContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandContainer);
