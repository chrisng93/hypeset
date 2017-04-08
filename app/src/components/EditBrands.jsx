import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  // don't have .isRequired because React doesn't recognize the props when you use React.cloneElement
  availableBrands: T.array,
  userBrands: T.array,
  popularBrands: T.array,
  token: T.string,

  getAllBrands: T.func,
  addBrand: T.func,
  removeBrand: T.func,
  getOwnNews: T.func,
  getOwnSales: T.func,
};

export default class EditBrands extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleRemove: false,
    };
    this.onAddBrand = this.onAddBrand.bind(this);
    this.toggleRemoveBrands = this.toggleRemoveBrands.bind(this);
  }

  componentWillMount() {
    const { availableBrands, popularBrands, getAllBrands, getBrandsByPopularity, token } = this.props;
    if (!availableBrands.length) {
      getAllBrands({ token });
    }
    if (!popularBrands.length) {
      getBrandsByPopularity({ limit: 20 });
    }
  }

  componentWillUnmount() {
    const { token, getOwnNews, getOwnSales } = this.props;
    getOwnNews({ token, offset: 0, limit: 20, replace: true });
    getOwnSales({ token, offset: 0, limit: 20, replace: true });
  }

  onAddBrand(brandName) {
    const { token, userBrands, addBrand } = this.props;
    const userBrandNames = userBrands.map(brand => brand.name);
    if (userBrandNames.indexOf(brandName) < 0) {
      addBrand({ token, brands: [brandName] });
    }
  }

  toggleRemoveBrands() {
    this.setState({ toggleRemove: !this.state.toggleRemove });
  }

  render() {
    const { availableBrands, userBrands, popularBrands, removeBrand, token } = this.props;
    return (
      <section className="edit-brands">
        <section className="edit-brands-add">
          <h1>
            Add brands
          </h1>
          <ul>
            {availableBrands.map((brand, key) =>
                <li key={key}>
                  <span onClick={() => this.onAddBrand(brand.name)}>{brand.name}</span>
                </li>
            )}
          </ul>
        </section>
        <section className="edit-brands-following">
          <section className="edit-brands-following-title">
            <h1>
              Following
            </h1>
            <button className="edit-brands-following-title-toggle" onClick={this.toggleRemoveBrands}>
              Remove
            </button>
          </section>
          <ul>
            {userBrands.map((brand, key) =>
                <li key={key}>
                  <button
                    className={`edit-brands-following-remove ${this.state.toggleRemove ? '' : 'hidden'}`}
                    onClick={() => removeBrand({ token, brands: [brand.name] })}
                  >x</button>
                  {brand.name}
                </li>
            )}
          </ul>
        </section>
        <section className="edit-brands-popular">
          <h1>
            Popular brands
          </h1>
          <ul>
            {popularBrands.map((brand, key) =>
                <li key={key}>
                  {key + 1}. <span
                  onClick={() => this.onAddBrand(brand.brandName)}>{brand.brandName}</span>
                </li>
            )}
          </ul>
        </section>
      </section>
    );
  }
}

EditBrands.propTypes = propTypes;
