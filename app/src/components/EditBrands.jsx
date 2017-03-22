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
      <div className="brands">
        <div className="dropdown">
          Add brands:
          {availableBrands.map((brand, key) => {
            return (
              <div key={key}>
                {brand.name}
                <input type="button" value="Add brand to favorites" onClick={() => addBrand({ token, brands: [brand.name] })} />
              </div>
            );
          })}
        </div>
        <div className="popular">
          Popular brands:
          {popularBrands.map((brand, key) => <div key={key}>{brand.brandName}</div>)}
        </div>
        <div className="following">
          Following:
          {userBrands.map((brand, key) => {
            return (
              <div key={key}>
                {brand.name}
                <input type="button" value="Remove brand from favorites" onClick={() => removeBrand({ token, brands: [brand.name] })} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

EditBrands.propTypes = propTypes;
