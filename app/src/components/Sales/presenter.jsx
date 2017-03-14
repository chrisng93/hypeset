import React, { Component, PropTypes as T } from 'react';
import Nav from '../Nav';

export default class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav />
        Sales page
      </div>
    );
  }
}

Sales.propTypes = {

};
