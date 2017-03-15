import React, { Component, PropTypes as T } from 'react';

export default class EditBrands extends Component {
  componentWillMount() {
    const { getAllBrands, getUserBrands, token } = this.props;
    getAllBrands({ token });
    getUserBrands({ token });
  }

  render() {
    const { availableBrands, userBrands, addBrand, removeBrand, token } = this.props;
    // TODO: make dropdown with brands that user doesn't have - click on these to add
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

EditBrands.propTypes = {
  getAllBrands: T.func,
  getUserBrands: T.func,
  addBrand: T.func,
  removeBrand: T.func,
  availableBrands: T.array,
  userBrands: T.array,
  token: T.string,
};
