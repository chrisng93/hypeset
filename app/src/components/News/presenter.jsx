import React, { Component, PropTypes as T } from 'react';
import Article from '../Article';
import Checkbox from '../Checkbox';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOutBrands: [],
      filteredOutSites: [],
      offset: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.changeFilteredOutState = this.changeFilteredOutState.bind(this);
    this.retrieveNews = this.retrieveNews.bind(this);
  }

  componentWillMount() {
    this.retrieveNews();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  retrieveNews() {
    const { offset } = this.state;
    const { token, getNews } = this.props;
    getNews({ token, offset });
  }

  changeFilteredOutState(info, isFilteredOut, field) {
    const newState = {};
    newState[field] = null;
    if (isFilteredOut) {
      newState[field] = this.state[field].concat(info);
    } else {
      newState[field] = this.state[field].filter(stateInfo => stateInfo !== info);
    }
    this.setState(newState);
  }

  handleScroll() {
    const { offset } = this.state;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      this.setState({
        offset: offset + 20,
      }, this.retrieveNews);
    }
  }

  render() {
    const { filteredOutBrands, filteredOutSites } = this.state;
    const { news, newsBrands, newsSites } = this.props;
    return (
      <div className="news">
        <div className="news-container">
        {news.filter((news) => {
          for (let i = 0; i < news.Brands.length; i++) {
            if (filteredOutBrands.indexOf(news.Brands[i].name) >= 0) {
              return false;
            }
          }
          return filteredOutSites.indexOf(news.Site.name) < 0;
        }).map((news, key) => <Article article={news} key={key} /> )}
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

News.propTypes = {
  getNews: T.func,
  token: T.string,
  news: T.array,
};
