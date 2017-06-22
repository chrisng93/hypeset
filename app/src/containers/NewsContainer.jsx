/**
 * Stateful container for news
 */

import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import { newsSelector, isFetchingAllNewsSelector, isFetchingOwnNewsSelector } from '../selectors/newsSelectors';
import { pathnameSelector } from '../selectors/routingSelectors';
import Articles from '../components/Articles';

const propTypes = {
  isAuthenticated: T.bool.isRequired,
  token: T.string.isRequired,
  pathname: T.string.isRequired,
  news: T.array.isRequired,
  isFetchingAllNews: T.bool.isRequired,
  isFetchingOwnNews: T.bool.isRequired,

  getAllNews: T.func,
  getOwnNews: T.func,
  routeToBrandPage: T.func,
};

function NewsContainer(props) {
  const { isAuthenticated, token, pathname, news, isFetchingAllNews,
    isFetchingOwnNews, getAllNews, getOwnNews, routeToBrandPage } = props;
  const articlesProps = {
    isAuthenticated,
    token,
    pathname,
    articles: news,
    isFetchingAllArticles: isFetchingAllNews,
    isFetchingOwnArticles: isFetchingOwnNews,
    getAllArticles: getAllNews,
    getOwnArticles: getOwnNews,
    routeToBrandPage,
    type: 'news',
  };
  return (
    <section className="news">
      <section className="news-title">
        <h1>
          Curated News
        </h1>
      </section>
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
    isFetchingAllNews: isFetchingAllNewsSelector(state),
    isFetchingOwnNews: isFetchingOwnNewsSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllNews: bindActionCreators(actions.getAllNews, dispatch),
    getOwnNews: bindActionCreators(actions.getOwnNews, dispatch),
    routeToBrandPage: (brand) => dispatch(push(`/brands/${brand}`)),
  };
}

NewsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
