import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { brandNameSelector, brandCondensedNameSelector, brandNewsSelector, brandSalesSelector, isFetchingBrandInfosSelector } from '../selectors/brandSelectors';
import Articles from '../components/Articles';

const propTypes = {
  brandName: T.string,
  brandCondensedName: T.string,
  brandNews: T.array.isRequired,
  brandSales: T.array.isRequired,
  isFetchingBrandInfos: T.bool,
  getBrandInfos: T.func,
  resetBrandInfos: T.func,
};

class BrandContainer extends Component {
  constructor(props) {
    super(props);
    this.state ={
      selected: 'news',
    };
    this.changeTabs = this.changeTabs.bind(this);
    this.renderArticles = this.renderArticles.bind(this);
  }

  componentWillMount() {
    this.props.getBrandInfos({ brand: this.props.params.brand, offset: 0, limit: 20 });
  }

  componentWillUnmount() {
    this.props.resetBrandInfos();
  }

  changeTabs(tab) {
    if (this.state.selected !== tab) {
      this.setState({ selected: tab });
    }
  }

  renderArticles() {
    const { selected } = this.state;
    const { params, brandCondensedName, brandNews, brandSales, getBrandInfos, isFetchingBrandInfos } = this.props;
    const base = {
      brand: brandCondensedName || params.brand,
      isFetchingBrandArticles: isFetchingBrandInfos,
      getBrandArticles: getBrandInfos,
      type: selected,
    };
    const brandNewsProps = { ...base, articles: brandNews || [] };
    const brandSalesProps = { ...base, articles: brandSales || [] };
    if (selected === 'news') {
      return (
        <Articles {...brandNewsProps} />
      );
    }
    return (
      <Articles {...brandSalesProps} />
    );
  }

  render() {
    return (
      <section className="brand">
        <section className="brand-title">
          <h1>{this.props.brandName}</h1>
          <ul className="brand-title-tabs">
            <li className="brand-title-tabs-news" onClick={() => this.changeTabs('news')}>News</li>
            <li className="brand-title-tabs-sales" onClick={() => this.changeTabs('sales')}>Sales</li>
          </ul>
        </section>
        <section className={`brand-articles ${this.state.selected === 'news' ? 'news' : 'sales'}`}>
          {this.renderArticles()}
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    brandName: brandNameSelector(state),
    brandCondensedName: brandCondensedNameSelector(state),
    brandNews: brandNewsSelector(state),
    brandSales: brandSalesSelector(state),
    isFetchingBrandInfos: isFetchingBrandInfosSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getBrandInfos: bindActionCreators(actions.getBrandInfos, dispatch),
    resetBrandInfos: bindActionCreators(actions.resetBrandInfos, dispatch),
  };
}

BrandContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BrandContainer);
