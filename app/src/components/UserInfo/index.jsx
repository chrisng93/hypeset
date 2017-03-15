import React, { PropTypes as T } from 'react';

export default function UserInfo({ user, routeToEditUser }) {
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

UserInfo.propTypes = {
  user: T.object,
  routeToEditUser: T.func,
};
