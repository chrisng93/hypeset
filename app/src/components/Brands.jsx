import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  children: T.node,
  brands: T.array.isRequired,
  brandsByGrouping: T.object.isRequired,
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
  constructor(props) {
    super(props);
    this.renderBrand = this.renderBrand.bind(this);
  }

  componentWillMount() {
    const { brands, getAllBrands } = this.props;
    if (!brands.length) {
      getAllBrands();
    }
  }

  renderBrandList() {
    const { brandsByGrouping, routeToBrandPage } = this.props;
    return (
      Object.keys(brandsByGrouping).map((key) => {
        const brandsInGrouping = brandsByGrouping[key];
        return (
          <section key={key} className="brands-list-grouping">
            <h1>{key}</h1>
            <section className="brands-list-grouping-brands">
              {brandsInGrouping.map((brand, key) => <section key={key} className="brands-list-grouping-brands-brand" onClick={() => routeToBrandPage(brand.condensedName)}>{brand.name}</section>)}
            </section>
          </section>
        );
      })
    );
  }

  renderBrand() {
    const { children, brandName, brandCondensedName, brandNews, brandSales, isFetchingBrandInfos, getBrandInfos, resetBrandInfos } = this.props;
    const childProps = { brandName, brandCondensedName, brandNews, brandSales, isFetchingBrandInfos, getBrandInfos, resetBrandInfos };
    return React.Children.map(children, (child) => React.cloneElement(child, childProps));
  }

  render() {
    return (
      <section className="brands-container">
        <h1><span>Curated Brands</span></h1>
        <section className="brands">
          <ul className="brands-list">
            {this.renderBrandList()}
          </ul>
          {/*{this.renderBrand()}*/}
        </section>
      </section>
    )
  }
}

Brands.propTypes = propTypes;
