import React, { Component, PropTypes as T } from 'react';
import UserInfo from '../UserInfo';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { routeToEditBrands } = this.props;
    return (
      <div className="profile">
        Profile Page
        <UserInfo {...this.props} />
        <button onClick={routeToEditBrands}>Edit brands</button>
      </div>
    );
  }
}

Profile.propTypes = {
  user: T.object,
  routeToEditBrands: T.func,
};
