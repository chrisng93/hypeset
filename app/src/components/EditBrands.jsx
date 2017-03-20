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
    const { getAllBrands, getBrandsByPopularity, token } = this.props;
    getAllBrands({ token });
    getBrandsByPopularity({ token, limit: 20 });
  }

  render() {
    const { availableBrands, userBrands, popularBrands, addBrand, removeBrand, token } = this.props;
    // TODO: make dropdown with available brands
    return (
      <div className="brands">
        <div className="dropdown">
          Add brands:
          {availableBrands.sort((a, b) => a > b).map((brand, key) => {
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
          {userBrands.sort((a, b) => a > b).map((brand, key) => {
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
