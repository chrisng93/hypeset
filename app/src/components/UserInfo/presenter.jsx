import React, { Component, PropTypes as T } from 'react';

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { user, routeToEditUser } = this.props;
    const fields = ['username', 'password', 'firstName', 'lastName', 'email'];
    return (
      <div className="user-info">
        <div className="username">
          Username: {user.username}
        </div>
        <div className="password">
          Password: {user.password}
        </div>
        <div className="first-name">
          First name: {user.firstName}
        </div>
        <div className="last-name">
          Last name: {user.lastName}
        </div>
        <div className="email">
          Email: {user.email}
        </div>
        <input type="button" value="Edit user" onClick={routeToEditUser} />
      </div>
    );
  }
}

UserInfo.propTypes = {
  user: T.object,
  routeToEditUser: T.func,
};
