import React, { Component, PropTypes as T } from 'react';
import Nav from '../Nav';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Nav />
        Profile page
      </div>
    );
  }
}

Profile.propTypes = {

};
