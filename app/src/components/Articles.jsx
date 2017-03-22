import React, { Component, PropTypes as T } from 'react';
import ArticleItem from './ArticleItem';
import Checkbox from './Checkbox';

const propTypes = {
  isAuthenticated: T.bool,
  token: T.string,
  brand: T.string,
  articles: T.array.isRequired,
  articlesBrands: T.array,
  articlesSites: T.array,
  isFetchingAllArticles: T.bool.isRequired,
  isFetchingOwnArticles: T.bool.isRequired,
  getAllArticles: T.func.isRequired,
  getOwnArticles: T.func.isRequired,
  shouldFilter: T.bool.isRequired,
};

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: [],
      filteredOutBrands: [],
      filteredOutSites: [],
      dbOffset: 0,
      visibleOffset: 0,
      limit: 20,
    };
    this.retrieveArticles = this.retrieveArticles.bind(this);
    this.changeFilteredOutState = this.changeFilteredOutState.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.renderFilters = this.renderFilters.bind(this);
  }

  componentWillMount() {
    const { limit } = this.state;
    const { articles } = this.props;
    const visibleArray = articles.slice(0, (limit / 2));
    this.setState({
      dbOffset: articles.length,
      visible: visibleArray,
      visibleOffset: visibleArray.length,
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFetchingAllArticles || nextProps.isFetchingOwnArticles) {
      return;
    }
    const { articles } = nextProps;
    this.filterResults(articles);
    this.setState({ dbOffset: articles.length + 1 });
  }

  retrieveArticles() {
    const { dbOffset, limit } = this.state;
    const { isAuthenticated, token, brand, getAllArticles, getOwnArticles } = this.props;
    if (brand) {
      getAllArticles({ offset: dbOffset, limit, brand });
      return;
    }
    isAuthenticated ? getOwnArticles({ token, offset: dbOffset, limit }) : getAllArticles({ offset: dbOffset, limit });
  }

  changeFilteredOutState(info, isFilteredOut, field) {
    const { articles } = this.props;
    const newState = {};
    newState[field] = null;
    isFilteredOut ? newState[field] = this.state[field].concat(info) : newState[field] = this.state[field].filter(stateInfo => stateInfo !== info);
    field === 'filteredOutBrands' ? this.filterResults(articles, newState.filteredOutBrands) : this.filterResults(articles, this.state.filteredOutBrands, newState.filteredOutSites);
    this.setState(newState);
  }

  filterResults(articles, filteredOutBrands = this.state.filteredOutBrands, filteredOutSites = this.state.filteredOutSites) {
    let validArticles;
    const { visibleOffset, limit } = this.state;
    if (!filteredOutBrands.length && !filteredOutSites.length) {
      validArticles = articles;
    } else {
      validArticles = articles.filter((row) => {
        for (let i = 0; i < row.Brands.length; i++) {
          if (filteredOutBrands.indexOf(row.Brands[i].name) >= 0) {
            return false;
          }
        }
        return filteredOutSites.indexOf(row.Site.name) < 0;
      });
    }
    const visibleArray = validArticles.slice(0, visibleOffset + (limit / 2));
    this.setState({ visible: visibleArray, visibleOffset: visibleArray.length });
  }

  handleScroll() {
    const { visible, limit } = this.state;
    const { articles } = this.props;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      articles.length - visible.length <= (limit / 2) ? this.retrieveArticles() : this.filterResults(articles);
    }
  }

  renderFilters() {
    const { shouldFilter, articlesBrands, articlesSites } = this.props;
    if (shouldFilter) {
      return (
        <div className="filter-container">
          <div className="filter">
            <div className="header">Filters</div>
            <div className="articles-brands">
              <div className="title">Brands</div>
              {articlesBrands.map((brand, key) => <Checkbox key={key} info={brand} clickHandler={(brandName, isFilteredOut) => this.changeFilteredOutState(brandName, isFilteredOut, 'filteredOutBrands')} />)}
            </div>
            <div className="articles-sites">
              <div className="title">Sites</div>
              {articlesSites.map((site, key) => <Checkbox key={key} info={site} clickHandler={(brandName, isFilteredOut) => this.changeFilteredOutState(site, isFilteredOut, 'filteredOutSites')} />)}
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    const { visible } = this.state;
    return (
      <div className="articles">
        <div className="articles-container">
        {visible.map((article, key) => <ArticleItem key={key} article={article} /> )}
        </div>
        {this.renderFilters()}
      </div>
    );
  }
}

Articles.propTypes = propTypes;
