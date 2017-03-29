import React, { Component, PropTypes as T } from 'react';
import ArticleItem from './ArticleItem';
import Checkbox from './Checkbox';

const propTypes = {
  isAuthenticated: T.bool,
  token: T.string,
  brand: T.string,
  articles: T.array.isRequired,
  isFetchingAllArticles: T.bool,
  isFetchingOwnArticles: T.bool,
  isFetchingBrandArticles: T.bool,
  getAllArticles: T.func,
  getOwnArticles: T.func,
  getBrandArticles: T.func,
  type: T.string,
};

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: [],
      dbOffset: 0,
      visibleOffset: 0,
      limit: 8,
    };
    this.setArticles = this.setArticles.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.reversePage = this.reversePage.bind(this);
    this.goToBeginning = this.goToBeginning.bind(this);
  }

  componentWillMount() {
    this.setArticles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetchingAllArticles || nextProps.isFetchingOwnArticles || nextProps.isFetchingBrandArticles) {
      return;
    }
    console.log('got props', nextProps.articles)
    this.setArticles(nextProps.articles);
    this.setState({ dbOffset: nextProps.articles.length });
  }

  setArticles(articles = null) {
    const { visibleOffset, limit } = this.state;
    if (!articles) {
      articles = this.props.articles;
    }
    const showUntil = visibleOffset + (limit / 2);
    const visibleArray = articles.slice(visibleOffset, showUntil);
    this.setState({
      dbOffset: articles.length,
      visible: visibleArray,
      visibleOffset: showUntil,
    });
  }

  retrieveArticles() {
    const { dbOffset, limit } = this.state;
    const { isAuthenticated, token, brand, type, getAllArticles, getOwnArticles, getBrandArticles } = this.props;
    if (brand) {
      getBrandArticles({ offset: dbOffset, limit, brand, type });
      return;
    }
    isAuthenticated ? getOwnArticles({ token, offset: dbOffset, limit }) : getAllArticles({ offset: dbOffset, limit });
  }

  reversePage() {
    const { visibleOffset, limit } = this.state;
    const { articles } = this.props;
    const showUntil = visibleOffset - (limit / 2);
    const visibleArray = articles.slice(showUntil - (limit / 2), showUntil);
    this.setState({
      visible: visibleArray,
      visibleOffset: showUntil,
    });
  }

  goToBeginning() {
    const { limit } = this.state;
    const { articles } = this.props;
    const showUntil = limit / 2;
    const visibleArray = articles.slice(0, showUntil);
    this.setState({
      visible: visibleArray,
      visibleOffset: showUntil,
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <article className="articles-container">
        <section className="articles">
          {visible.map((article, key) => <ArticleItem key={key} article={article} /> )}
        </section>
        <section className="articles-nav">
          <a onClick={this.retrieveArticles}>Go forward</a><br/>
          <a onClick={this.reversePage}>Go backward</a><br/>
          <a onClick={this.goToBeginning}>Go to beginning</a>
        </section>
      </article>
    );
  }
}

Articles.propTypes = propTypes;
