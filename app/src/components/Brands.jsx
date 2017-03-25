import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  children: T.node,
  brands: T.array.isRequired,
  brandName: T.string,
  brandCondensedName: T.string,
  brandNews: T.array,
  brandSales: T.array,
  isFetchingBrandInfos: T.bool,
  getAllBrands: T.func.isRequired,
  getBrandInfos: T.func,
  resetBrandInfos: T.func,
  routeToBrandPage: T.func.isRequired,
};

export default class Brands extends Component {
  componentWillMount() {
    const { brands, getAllBrands } = this.props;
    if (!brands.length) {
      getAllBrands();
    }
    this.renderBrand = this.renderBrand.bind(this);
  }

  renderBrand() {
    const { children, brandName, brandCondensedName, brandNews, brandSales, isFetchingBrandInfos, getBrandInfos, resetBrandInfos } = this.props;
    const childProps = { brandName, brandCondensedName, brandNews, brandSales, isFetchingBrandInfos, getBrandInfos, resetBrandInfos };
    return React.Children.map(children, (child) => React.cloneElement(child, childProps));
  }

  render() {
    const { brands, routeToBrandPage } = this.props;
    return (
      <section className="brands">
        <ul className="brands-list">
          {brands.map((brand, key) => <li key={key} onClick={() => routeToBrandPage(brand.condensedName)}>{brand.name}</li>)}
        </ul>
        {this.renderBrand()}
      </section>
    )
  }
}

Brands.propTypes = propTypes;
