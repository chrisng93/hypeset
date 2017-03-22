import React, { Component, PropTypes as T } from 'react';
import Articles from './Articles';

const propTypes = {
  brandName: T.string,
  brandCondensedName: T.string.isRequired,
  brandNews: T.array.isRequired,
  brandSales: T.array.isRequired,
  isFetchingBrandInfos: T.bool.isRequired,
  getBrandInfos: T.func.isRequired,
};

export default class Brand extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { brandName, brandCondensedName, brandNews, brandSales, getBrandInfos, isFetchingBrandInfos } = this.props;
    const base = {
      brand: brandCondensedName,
      isFetchingAllArticles: isFetchingBrandInfos,
      isFetchingOwnArticles: isFetchingBrandInfos,
      getAllArticles: getBrandInfos,
      getOwnArticles: getBrandInfos,
      shouldFilter: false,
    };
    const brandNewsProps = { ...base, articles: brandNews || [] };
    const brandSalesProps = { ...base, articles: brandSales || [] };
    return (
      <div className="brand">
        {brandName}
        <div className="brand-news">
          <div className="title">News</div>
          <Articles {...brandNewsProps} />
        </div>
        <div className="brand-sales">
          <div className="title">Sales</div>
          <Articles {...brandSalesProps} />
        </div>
      </div>
    );
  }
}

Brand.propTypes = propTypes;
