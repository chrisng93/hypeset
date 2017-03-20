import React, { Component, PropTypes as T } from 'react';
import ArticleItem from './ArticleItem';
import Checkbox from './Checkbox';

const propTypes = {
  token: T.string.isRequired,
  sales: T.array.isRequired,
  salesBrands: T.array.isRequired,
  salesSites: T.array.isRequired,
  getSales: T.func.isRequired,
};

export default class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredOutBrands: [],
      filteredOutSites: [],
      offset: 0,
    };
    this.retrieveSales = this.retrieveSales.bind(this);
    this.changeFilteredOutState = this.changeFilteredOutState.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    const { sales } = this.props;
    this.setState({
      offset: sales.length + 1,
    }, () => {
      if (sales.length < 20) {
        this.retrieveSales();
      }
    });
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  retrieveSales() {
    const { offset } = this.state;
    const { token, getSales } = this.props;
    getSales({ token, offset });
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
      }, () => {
        this.retrieveSales();
      });
    }
  }

  render() {
    const { filteredOutBrands, filteredOutSites } = this.state;
    const { sales, salesBrands, salesSites } = this.props;
    return (
      <div className="sales">
        <div className="sales-container">
          {sales.filter((sales) => {
            for (let i = 0; i < sales.Brands.length; i++) {
              if (filteredOutBrands.indexOf(sales.Brands[i].name) >= 0) {
                return false;
              }
            }
            return filteredOutSites.indexOf(sales.Site.name) < 0;
          }).map((sales, key) => <ArticleItem article={sales} key={key} /> )}
        </div>
        <div className="filter-container">
          <div className="filter">
            <div className="header">Filters</div>
            <div className="sales-brands">
              <div className="title">Brands</div>
              {salesBrands.map((brand, key) => <Checkbox key={key} info={brand} clickHandler={(brandName, isFilteredOut) => this.changeFilteredOutState(brandName, isFilteredOut, 'filteredOutBrands')} />)}
            </div>
            <div className="sales-sites">
              <div className="title">Sites</div>
              {salesSites.map((site, key) => <Checkbox key={key} info={site} clickHandler={(brandName, isFilteredOut) => this.changeFilteredOutState(site, isFilteredOut, 'filteredOutSites')} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sales.propTypes = propTypes;
