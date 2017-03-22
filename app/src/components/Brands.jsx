import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  brands: T.array,
};

export default class Brands extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { brands } = this.props;
    return (
      <div className="brands">
        {brands.map((brand, key) => <div key={key}>{brand.name}</div>)}
      </div>
    )
  }
}

Brands.propTypes = propTypes;
