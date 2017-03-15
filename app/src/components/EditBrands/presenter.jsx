import React, { Component, PropTypes as T } from 'react';

export default class EditBrands extends Component {
  componentWillMount() {
    const { getAllBrands, getUserBrands, token } = this.props;
    getAllBrands({ token });
    getUserBrands({ token });
  }

  render() {
    const { allBrands, userBrands } = this.props;
    return (
      <div>
        Edit Brands
        {allBrands.map((brand, key) => {
          return (
            <div key={key}>{brand.name}</div>
          );
        })}
        {userBrands.map((brand, key) => {
          return (
            <div key={key}>{brand.name}</div>
          );
        })}
      </div>
    );
  }
}

EditBrands.propTypes = {
  getAllBrands: T.func,
  getUserBrands: T.func,
  allBrands: T.array,
  userBrands: T.array,
  token: T.string,
};
