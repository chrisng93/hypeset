import React, { Component, PropTypes as T } from 'react';
import ArticleItem from './ArticleItem';
import Checkbox from './Checkbox';

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

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: [],
      filteredOutBrands: [],
      filteredOutSites: [],
      dbOffset: 0,
      visibleOffset: 0,
    };
    this.retrieveNews = this.retrieveNews.bind(this);
    this.changeFilteredOutState = this.changeFilteredOutState.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    const { news, isFetchingAllNews, isFetchingOwnNews } = this.props;
    if (news.length === 0 && !isFetchingAllNews && !isFetchingOwnNews) {
      this.retrieveNews();
    }
    const visibleArray = news.slice(0, 10);
    this.setState({
      dbOffset: news.length,
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
    if (nextProps.isFetchingAllNews || nextProps.isFetchingOwnNews) {
      return;
    }
    const { news } = nextProps;
    this.filterResults(news);
    this.setState({ dbOffset: news.length + 1 });
  }

  retrieveNews() {
    const { dbOffset } = this.state;
    const { isAuthenticated, token, getAllNews, getOwnNews } = this.props;
    isAuthenticated ? getOwnNews({ token, offset: dbOffset }) : getAllNews({ offset: dbOffset });
  }

  changeFilteredOutState(info, isFilteredOut, field) {
    const { news } = this.props;
    const newState = {};
    newState[field] = null;
    isFilteredOut ? newState[field] = this.state[field].concat(info) : newState[field] = this.state[field].filter(stateInfo => stateInfo !== info);
    field === 'filteredOutBrands' ? this.filterResults(news, newState.filteredOutBrands) : this.filterResults(news, this.state.filteredOutBrands, newState.filteredOutSites);
    this.setState(newState);
  }

  filterResults(news, filteredOutBrands = this.state.filteredOutBrands, filteredOutSites = this.state.filteredOutSites) {
    let validNews;
    const { visibleOffset } = this.state;
    console.log('visible offset', visibleOffset);
    if (!filteredOutBrands.length && !filteredOutSites.length) {
      validNews = news;
    } else {
      validNews = news.filter((row) => {
        for (let i = 0; i < row.Brands.length; i++) {
          if (filteredOutBrands.indexOf(row.Brands[i].name) >= 0) {
            return false;
          }
        }
        return filteredOutSites.indexOf(row.Site.name) < 0;
      });
    }
    const visibleArray = validNews.slice(0, visibleOffset + 10);
    this.setState({ visible: visibleArray, visibleOffset: visibleArray.length });
  }

  handleScroll() {
    const { visible } = this.state;
    const { news } = this.props;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      news.length - visible.length < 20 ? this.retrieveNews() : this.filterResults(news);
    }
  }

  render() {
    const { filteredOutBrands, filteredOutSites, visible } = this.state;
    const { newsBrands, newsSites } = this.props;
    return (
      <div className="news">
        <div className="news-container">
        {visible.map((news, key) => <ArticleItem key={key} article={news} /> )}
        </div>
        <div className="filter-container">
          <div className="filter">
            <div className="header">Filters</div>
            <div className="news-brands">
              <div className="title">Brands</div>
              {newsBrands.map((brand, key) => <Checkbox key={key} info={brand} clickHandler={(brandName, isFilteredOut) => this.changeFilteredOutState(brandName, isFilteredOut, 'filteredOutBrands')} />)}
            </div>
            <div className="news-sites">
              <div className="title">Sites</div>
              {newsSites.map((site, key) => <Checkbox key={key} info={site} clickHandler={(brandName, isFilteredOut) => this.changeFilteredOutState(site, isFilteredOut, 'filteredOutSites')} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

News.propTypes = propTypes;
