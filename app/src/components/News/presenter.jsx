import React, { Component, PropTypes as T } from 'react';
import Article from '../Article';
import Checkbox from '../Checkbox';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOutBrands: [],
      filteredOutSites: [],
    };
  }

  componentWillMount() {
    const { token, getNews } = this.props;
    getNews({ token });
  }

  changeFilteredOutState(info, isFilteredOut, field) {
    const newState = {};
    newState[field] = null;
    if (isFilteredOut) {
      newState[field] = this.state[field].concat(info);
    } else {
      newState[field] = this.state[field].filter(stateInfo => stateInfo !== info);
    }
    console.log(isFilteredOut, this.state.filteredOutBrands, newState)
    this.setState(newState);
  }

  render() {
    const { filteredOutBrands, filteredOutSites } = this.state;
    const { newsBrands, newsSites } = this.props;
    return (
      <div className="news">
        <div className="news-container">
        {this.props.news.filter(news => {
          for (let i = 0; i < news.Brands.length; i++) {
            if (filteredOutBrands.indexOf(news.Brands[i].name) >= 0) {
              return false;
            }
          }
          return filteredOutSites.indexOf(news.Site.name) < 0;
        }).map((news, key) => <Article article={news} key={key} /> )}
        </div>
        <div className="filter">
          <div className="header">Filter</div>
          <div className="news-brands">
            Brands
            {newsBrands.map((brand, key) => <Checkbox info={brand} clickHandler={(brandName, isFilteredOut) => this.changeFilteredOutState(brandName, isFilteredOut, 'filteredOutBrands')} />)}
          </div>
          <div className="news-sites">
            Sites
            {newsSites.map((site, key) => <Checkbox info={site} clickHandler={(brandName, isFilteredOut) => this.changeFilteredOutState(site, isFilteredOut, 'filteredOutSites')} />)}
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
