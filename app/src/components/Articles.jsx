import React, { Component, PropTypes as T } from 'react';
import ArticleItem from './ArticleItem';

const propTypes = {
  isAuthenticated: T.bool,
  token: T.string,
  pathname: T.string,
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
      visibleOffset: 0,
      limit: 8,
    };
    this.setInitialArticles = this.setInitialArticles.bind(this);
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.onForwardPage = this.onForwardPage.bind(this);
    this.onBackPage = this.onBackPage.bind(this);
    this.renderNoVisibleArticles = this.renderNoVisibleArticles.bind(this);
  }

  componentWillMount() {
    this.setInitialArticles();
  }

  componentWillReceiveProps(nextProps) {
    if (((nextProps.isFetchingAllArticles || nextProps.isFetchingOwnArticles || nextProps.isFetchingBrandArticles)
         || (this.props.isFetchingAllArticles || this.props.isFetchingOwnArticles || this.props.isFetchingBrandArticles)
         || (this.props.pathname === nextProps.pathname && !nextProps.brand)
         || (this.props.articles.length === nextProps.articles.length)) && this.props.articles.length !== 0) {
      return;
    }
    let changeTab = this.props.type !== nextProps.type;
    this.setInitialArticles(nextProps.articles, changeTab);
  }

  setInitialArticles(articles = this.props.articles, changeTab = false) {
    const { visible, visibleOffset, limit } = this.state;
    if (!articles.length && !visible.length) {
      return;
    }
    let showUntil;
    let visibleArray;
    if (changeTab) {
      showUntil = limit / 2;
      visibleArray = articles.slice(0, showUntil);
    } else {
      showUntil = visibleOffset + (limit / 2);
      visibleArray = articles.slice(visibleOffset, showUntil);
    }
    this.setState({
      visible: visibleArray,
      visibleOffset: showUntil,
    });
  }

  retrieveArticles() {
    const { articles, isAuthenticated, token, brand, type, getAllArticles, getOwnArticles, getBrandArticles } = this.props;
    if (brand) {
      getBrandArticles({ offset: articles.length, limit: 20, brand, type });
      return;
    }
    isAuthenticated ? getOwnArticles({ token, offset: articles.length, limit: 20 }) : getAllArticles({ offset: articles.length, limit: 20 });
  }

  onForwardPage() {
    const { visibleOffset, limit } = this.state;
    const { articles } = this.props;
    if (articles.length <= visibleOffset) {
      return;
    }
    if (articles.length - visibleOffset < 5) {
      this.retrieveArticles();
    }
    const showUntil = visibleOffset + (limit / 2);
    const visibleArray = articles.slice(visibleOffset, showUntil);
    this.setState({
      visible: visibleArray,
      visibleOffset: showUntil,
    });
  }

  onBackPage() {
    const { visibleOffset, limit } = this.state;
    const { articles } = this.props;
    const showUntil = visibleOffset - (limit / 2);
    if (showUntil === 0) {
      return;
    }
    const visibleArray = articles.slice(showUntil - (limit / 2), showUntil);
    this.setState({
      visible: visibleArray,
      visibleOffset: showUntil,
    });
  }

  renderNoVisibleArticles() {
    if (!this.state.visible.length) {
      return (<p className="articles-none-visible">No {this.props.type} to show</p>);
    }
    return null;
  }

  render() {
    const { visible } = this.state;
    return (
      <article className="articles-container">
        <section className="articles">
          {visible.map((article, key) => <ArticleItem key={key} article={article} /> )}
          {this.renderNoVisibleArticles()}
        </section>
        <section className="articles-nav">
          <img className="articles-nav-forward" src="https://s3-us-west-1.amazonaws.com/hypeset/forward-arrow.png" onClick={this.onForwardPage} />
          <img className="articles-nav-backward" src="https://s3-us-west-1.amazonaws.com/hypeset/backward-arrow.png" onClick={this.onBackPage} />
        </section>
      </article>
    );
  }
}

Articles.propTypes = propTypes;
