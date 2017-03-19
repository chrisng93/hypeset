import React, { Component, PropTypes as T } from 'react';

export default class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { token, getSales } = this.props;
    getSales({ token });
  }

  render() {
    const { sales } = this.props;
    return (
      <div>
        Sales page
        {sales.map(sale => <div>{sale.title}</div>)}
      </div>
    );
  }
}

Sales.propTypes = {
  getSales: T.func,
  token: T.string,
  sales: T.array,
  salesBrands: T.array,
  salesSites: T.array,
};
