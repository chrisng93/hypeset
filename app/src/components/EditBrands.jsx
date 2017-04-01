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
};

export default class EditBrands extends Component {
  componentWillMount() {
    const { availableBrands, popularBrands, getAllBrands, getBrandsByPopularity, token } = this.props;
    if (!availableBrands.length) {
      getAllBrands({ token });
    }
    if (!popularBrands.length) {
      getBrandsByPopularity({ limit: 20 });
    }
  }

  render() {
    const { availableBrands, userBrands, popularBrands, addBrand, removeBrand, token } = this.props;
    return (
      <section className="edit-brands">
        <section className="edit-brands-add">
          <h1>Add brands</h1>
          <ul>
            {availableBrands.map((brand, key) => {
              return (
                <li key={key}><span onClick={() => addBrand({ token, brands: [brand.name] })}>{brand.name}</span></li>
              );
            })}
          </ul>
        </section>
        <section className="edit-brands-following">
          <h1>Following</h1>
          <ul>
            {userBrands.map((brand, key) => {
              return (
                <li key={key} onClick={() => removeBrand({ token, brands: [brand.name] })}>{brand.name}</li>
              );
            })}
          </ul>
        </section>
        <section className="edit-brands-popular">
          <h1>Popular brands</h1>
          <ul>
            {popularBrands.map((brand, key) => <li key={key}>{key+1}. <span onClick={() => addBrand({ token, brands: [brand.brandName] })}>{brand.brandName}</span></li>)}
          </ul>
        </section>
      </section>
    );
  }
}

EditBrands.propTypes = propTypes;
