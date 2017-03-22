import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { allBrandsSelector } from '../selectors/brandSelectors';
import Brands from '../components/Brands';

const propTypes = {
  brands: T.array.isRequired,
  getAllBrands: T.func.isRequired,
};

function BrandsContainer(props) {
  return (
    <Brands {...props} />
  );
}

function mapStateToProps(state) {
  return {
    brands: allBrandsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
  };
}

BrandsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandsContainer);
