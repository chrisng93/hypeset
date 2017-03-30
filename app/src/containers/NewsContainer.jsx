import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import { newsSelector, newsBrandsSelector, newsSitesSelector, isFetchingAllNewsSelector, isFetchingOwnNewsSelector } from '../selectors/newsSelectors';
import { pathnameSelector } from '../selectors/routingSelectors';
import Articles from '../components/Articles';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  pathname: T.string.isRequired,
  news: T.array.isRequired,
  newsBrands: T.array.isRequired,
  newsSites: T.array.isRequired,
  isFetchingAllNews: T.bool.isRequired,
  isFetchingOwnNews: T.bool.isRequired,
  getAllNews: T.func.isRequired,
  getOwnNews: T.func.isRequired,
};

function NewsContainer(props) {
  const { isAuthenticated, token, pathname, news, newsBrands, newsSites, isFetchingAllNews, isFetchingOwnNews, getAllNews, getOwnNews } = props;
  const articlesProps = {
    isAuthenticated,
    token,
    pathname,
    articles: news,
    articlesBrands: newsBrands,
    articlesSites: newsSites,
    isFetchingAllArticles: isFetchingAllNews,
    isFetchingOwnArticles: isFetchingOwnNews,
    getAllArticles: getAllNews,
    getOwnArticles: getOwnNews,
    shouldFilter: true,
  };
  return (
    <section className="news">
      <h1><span>Curated News</span></h1>
      <Articles {...articlesProps} />
    </section>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    token: tokenSelector(state),
    pathname: pathnameSelector(state),
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
