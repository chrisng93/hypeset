import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { allBrandsSelector } from '../selectors/brandSelectors';
import Brands from '../components/Brands';

const propTypes = {
  brands: T.array,
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
  };
}

BrandsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandsContainer);
