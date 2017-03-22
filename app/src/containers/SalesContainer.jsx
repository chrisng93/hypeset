import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import { salesSelector, salesBrandsSelector, salesSitesSelector, isFetchingAllSalesSelector, isFetchingOwnSalesSelector } from '../selectors/salesSelectors';
import Articles from '../components/Articles';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  sales: T.array.isRequired,
  salesBrands: T.array.isRequired,
  salesSites: T.array.isRequired,
  isFetchingAllSales: T.bool.isRequired,
  isFetchingOwnSales: T.bool.isRequired,
  getAllSales: T.func.isRequired,
  getOwnSales: T.func.isRequired,
};

function SalesContainer(props) {
  const { isAuthenticated, token, sales, salesBrands, salesSites, isFetchingAllSales, isFetchingOwnSales, getAllSales, getOwnSales } = props;
  const articlesProps = {
    isAuthenticated,
    token,
    articles: sales,
    articlesBrands: salesBrands,
    articlesSites: salesSites,
    isFetchingAllArticles: isFetchingAllSales,
    isFetchingOwnArticles: isFetchingOwnSales,
    getAllArticles: getAllSales,
    getOwnArticles: getOwnSales,
    shouldFilter: true,
  };
  return (
    <div className="sales">
      <Articles {...articlesProps} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    token: tokenSelector(state),
    sales: salesSelector(state),
    salesBrands: salesBrandsSelector(state),
    salesSites: salesSitesSelector(state),
    isFetchingOwnSales: isFetchingOwnSalesSelector(state),
    isFetchingAllSales: isFetchingAllSalesSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllSales: bindActionCreators(actions.getAllSales, dispatch),
    getOwnSales: bindActionCreators(actions.getOwnSales, dispatch),
  };
}

SalesContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SalesContainer);
