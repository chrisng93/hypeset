import React, { Component, PropTypes as T } from 'react';
import ArticleItem from './ArticleItem';
import Checkbox from './Checkbox';

const propTypes = {
  token: T.string.isRequired,
  sales: T.array.isRequired,
  salesBrands: T.array.isRequired,
  salesSites: T.array.isRequired,
  isFetchingSales: T.bool.isRequired,
  getOwnSales: T.func.isRequired,
};

export default class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: [],
      filteredOutBrands: [],
      filteredOutSites: [],
      dbOffset: 0,
      visibleOffset: 0,
    };
    this.retrieveSales = this.retrieveSales.bind(this);
    this.changeFilteredOutState = this.changeFilteredOutState.bind(this);
    this.filterResults = this.filterResults.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentWillMount() {
    const { sales, isFetchingSales } = this.props;
    if (sales.length === 0 && !isFetchingSales) {
      this.retrieveSales();
    }
    const visibleArray = sales.slice(0, 10);
    this.setState({
      dbOffset: sales.length,
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
    const { sales } = nextProps;
    this.filterResults(sales);
    this.setState({ dbOffset: sales.length + 1 });
  }

  retrieveSales() {
    const { dbOffset } = this.state;
    const { token, getOwnSales } = this.props;
    getOwnSales({ token, offset: dbOffset });
  }

  changeFilteredOutState(info, isFilteredOut, field) {
    const { sales } = this.props;
    const newState = {};
    newState[field] = null;
    isFilteredOut ? newState[field] = this.state[field].concat(info) : newState[field] = this.state[field].filter(stateInfo => stateInfo !== info);
    field === 'filteredOutBrands' ? this.filterResults(sales, newState.filteredOutBrands) : this.filterResults(sales, this.state.filteredOutBrands, newState.filteredOutSites);
    this.setState(newState);
  }

  filterResults(sales, filteredOutBrands = this.state.filteredOutBrands, filteredOutSites = this.state.filteredOutSites) {
    const { visibleOffset } = this.state;
    const validSales = sales.filter((row) => {
      for (let i = 0; i < row.Brands.length; i++) {
        if (filteredOutBrands.indexOf(row.Brands[i].name) >= 0) {
          return false;
        }
      }
      return filteredOutSites.indexOf(row.Site.name) < 0;
    });
    const visibleArray = validSales.slice(0, visibleOffset + 10);
    this.setState({ visible: visibleArray, visibleOffset: visibleArray.length });
  }

  handleScroll() {
    const { visible } = this.state;
    const { sales } = this.props;
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      sales.length - visible.length < 10 ? this.retrieveSales() : this.filterResults(sales);
    }
  }

  render() {
    const { visible, filteredOutBrands, filteredOutSites } = this.state;
    const { salesBrands, salesSites } = this.props;
    return (
      <div className="sales">
        <div className="sales-container">
          {visible.map((sales, key) => <ArticleItem article={sales} key={key} /> )}
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
