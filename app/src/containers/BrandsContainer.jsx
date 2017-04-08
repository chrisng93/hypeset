import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { allBrandsSelector, allBrandsByGroupingSelector } from '../selectors/brandSelectors';
import Brands from '../components/Brands';

const propTypes = {
  brands: T.array.isRequired,
  brandsByGrouping: T.object.isRequired,

  getAllBrands: T.func.isRequired,
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
    brandsByGrouping: allBrandsByGroupingSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
    routeToBrandPage: (brand) => dispatch(push(`/brands/${brand}`)),
  };
}

BrandsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandsContainer);
