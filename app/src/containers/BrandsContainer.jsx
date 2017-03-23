import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { allBrandsSelector, brandNameSelector, brandCondensedNameSelector, brandNewsSelector, brandSalesSelector, isFetchingBrandInfosSelector } from '../selectors/brandSelectors';
import Brands from '../components/Brands';

const propTypes = {
  children: T.node,
  brands: T.array.isRequired,
  brandName: T.string,
  brandCondensedName: T.string,
  brandNews: T.array,
  brandSales: T.array,
  isFetchingBrandInfos: T.bool,
  getAllBrands: T.func.isRequired,
  getBrandInfos: T.func,
  resetBrandInfos: T.func,
  routeToBrandPage: T.func.isRequired,
};

function BrandsContainer(props) {
  return (
    <Brands {...props} />
  );
}

function mapStateToProps(state) {
  return {
    brands: allBrandsSelector(state),
    brandName: brandNameSelector(state),
    brandCondensedName: brandCondensedNameSelector(state),
    brandNews: brandNewsSelector(state),
    brandSales: brandSalesSelector(state),
    isFetchingBrandInfos: isFetchingBrandInfosSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
    getBrandInfos: bindActionCreators(actions.getBrandInfos, dispatch),
    resetBrandInfos: bindActionCreators(actions.resetBrandInfos, dispatch),
    routeToBrandPage: (brand) => dispatch(push(`/brands/${brand}`)),
  };
}

BrandsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandsContainer);
