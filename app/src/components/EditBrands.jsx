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
    // TODO: make dropdown with available brands
    return (
      <section className="edit-brands">
        <section className="edit-brands-add">
          <h1>Add brands:</h1>
          <ul className="edit-brands-add-dropdown">
            {availableBrands.map((brand, key) => {
              return (
                <li key={key}>
                  {brand.name}
                  <button value="Add brand to favorites" onClick={() => addBrand({ token, brands: [brand.name] })} />
                </li>
              );
            })}
          </ul>
        </section>
        <section className="edit-brands-popular">
          <h1>Popular brands:</h1>
          <ul>
            {popularBrands.map((brand, key) => <li key={key}>{brand.brandName}</li>)}
          </ul>
        </section>
        <section className="edit-brands-following">
          <h1>Following:</h1>
          <ul>
            {userBrands.map((brand, key) => {
              return (
                <li key={key}>
                  {brand.name}
                  <button value="Remove brand from favorites" onClick={() => removeBrand({ token, brands: [brand.name] })} />
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    );
  }
}

EditBrands.propTypes = propTypes;
