import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { tokenSelector } from '../selectors/userSelectors';
import { newsSelector, newsBrandsSelector, newsSitesSelector } from '../selectors/newsSelectors';
import News from '../components/News';

const propTypes = {
  token: T.string.isRequired,
  news: T.array.isRequired,
  getNews: T.func.isRequired,
};

function NewsContainer(props) {
  return (
    <News {...props} />
  );
}

function mapStateToProps(state) {
  return {
    token: tokenSelector(state),
    news: newsSelector(state),
    newsBrands: newsBrandsSelector(state),
    newsSites: newsSitesSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNews: bindActionCreators(actions.getNews, dispatch),
  };
}

NewsContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
