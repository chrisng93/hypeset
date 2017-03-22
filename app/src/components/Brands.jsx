import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  brands: T.array.isRequired,
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

  render() {
    const { brands, routeToBrandPage } = this.props;
    return (
      <div className="brands">
        {brands.map((brand, key) => <div key={key} onClick={() => routeToBrandPage(brand.condensedName)}>{brand.name}</div>)}
      </div>
    )
  }
}

Brands.propTypes = propTypes;
