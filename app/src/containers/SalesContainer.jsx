import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { tokenSelector } from '../selectors/userSelectors';
import { salesSelector, salesBrandsSelector, salesSitesSelector, isFetchingSalesSelector } from '../selectors/salesSelectors';
import Sales from '../components/Sales';

const propTypes = {
  token: T.string.isRequired,
  sales: T.array.isRequired,
  salesBrands: T.array.isRequired,
  salesSites: T.array.isRequired,
  isFetchingSales: T.bool.isRequired,
  getSales: T.func.isRequired,
};

function SalesContainer(props) {
  return (
    <Sales {...props} />
  );
}

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    sales: salesSelector(state),
    salesBrands: salesBrandsSelector(state),
    salesSites: salesSitesSelector(state),
    isFetchingSales: isFetchingSalesSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSales: bindActionCreators(actions.getSales, dispatch),
  };
}

SalesContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SalesContainer);
