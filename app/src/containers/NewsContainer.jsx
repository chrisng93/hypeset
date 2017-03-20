import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import { newsSelector, newsBrandsSelector, newsSitesSelector, isFetchingAllNewsSelector, isFetchingOwnNewsSelector } from '../selectors/newsSelectors';
import News from '../components/News';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  news: T.array.isRequired,
  newsBrands: T.array.isRequired,
  newsSites: T.array.isRequired,
  isFetchingAllNews: T.bool.isRequired,
  isFetchingOwnNews: T.bool.isRequired,
  getAllNews: T.func.isRequired,
  getOwnNews: T.func.isRequired,
};

function NewsContainer(props) {
  return (
    <News {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    token: tokenSelector(state),
    news: newsSelector(state),
    newsBrands: newsBrandsSelector(state),
    newsSites: newsSitesSelector(state),
    isFetchingAllNews: isFetchingAllNewsSelector(state),
    isFetchingOwnNews: isFetchingOwnNewsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllNews: bindActionCreators(actions.getAllNews, dispatch),
    getOwnNews: bindActionCreators(actions.getOwnNews, dispatch),
  };
}

NewsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
