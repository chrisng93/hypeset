import React, { Component, PropTypes as T } from 'react';
import Nav from '../Nav';
import UserInfo from '../UserInfo';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="profile">
        <Nav />
        Profile Page
        <UserInfo {...this.props} />
      </div>
    );
  }
}

Profile.propTypes = {
  user: T.object,
};
