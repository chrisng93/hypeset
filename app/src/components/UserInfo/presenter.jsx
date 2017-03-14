import React, { Component, PropTypes as T } from 'react';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, routeToEditUser } = this.props;
    return (
      <div className="user-info">
        <div className="username">
          Username: {user.username}
        </div>
        <div className="password">
          Password: **********
        </div>
        <div className="email">
          Email: {user.email}
        </div>
        <div className="first-name">
          First name: {user.firstName}
        </div>
        <div className="last-name">
          Last name: {user.lastName}
        </div>
        <input type="button" value="Edit info" onClick={routeToEditUser} />
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: T.object,
  routeToEditUser: T.func,
};
