import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { allBrandsSelector } from '../selectors/brandSelectors';
import Brands from '../components/Brands';

const propTypes = {
  brands: T.array.isRequired,
  getAllBrands: T.func.isRequired,
  routeToBrandPage: T.func.isRequired,
};

function BrandsContainer(props) {
  const { children } = props;
  if (children) {
    return (
      <div>
        {children}
      </div>
    );
  }
  return (
    <div className="brands-container">
      <Brands {...props} />
    </div>
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
    routeToBrandPage: (brand) => dispatch(push(`/brands/${brand}`)),
  };
}

BrandsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandsContainer);
