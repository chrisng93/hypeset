import React, { Component, PropTypes as T } from 'react';

export default class EditBrands extends Component {
  componentWillMount() {
    const { getAllBrands, getUserBrands, token } = this.props;
    getAllBrands({ token });
    getUserBrands({ token });
  }

  render() {
    const { allBrands, userBrands, addBrand, removeBrand, token } = this.props;
    return (
      <div>
        Edit Brands
        {allBrands.map((brand, key) => {
          return (
            <div key={key}>
              {brand.name}
              <input type="button" value="Add brand to favorites" onClick={() => addBrand({ token, brands: [brand.name] })} />
            </div>
          );
        })}
        {userBrands.map((brand, key) => {
          return (
            <div key={key}>
              {brand.name}
              <input type="button" value="Remove brand from favorites" onClick={() => removeBrand({ token, brands: [brand.name] })} />
            </div>
          );
        })}
      </div>
    );
  }
}

EditBrands.propTypes = {
  getAllBrands: T.func,
  getUserBrands: T.func,
  addBrand: T.func,
  removeBrand: T.func,
  allBrands: T.array,
  userBrands: T.array,
  token: T.string,
};
