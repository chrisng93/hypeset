import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  brands: T.array.isRequired,
  brandsByGrouping: T.object.isRequired,
  getAllBrands: T.func.isRequired,
  routeToBrandPage: T.func.isRequired,
};

export default class Brands extends Component {
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
              {brandsInGrouping.map((brand, key) =>
                <section key={key} className="brands-list-grouping-brands-brand">
                  <span onClick={() => routeToBrandPage(brand.condensedName)}>{brand.name}</span>
                </section>
              )}
            </section>
          </section>
        );
      })
    );
  }

  render() {
    return (
      <section className="brands-container">
        <h1><span>Curated Brands</span></h1>
        <section className="brands">
          <ul className="brands-list">
            {this.renderBrandList()}
          </ul>
        </section>
      </section>
    )
  }
}

Brands.propTypes = propTypes;
