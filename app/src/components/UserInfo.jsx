import React, { PropTypes as T } from 'react';

const propTypes = {
  user: T.object,
  routeToEditUser: T.func,
};

export default function UserInfo(props) {
  const { user, routeToEditUser } = props;
  return (
    <div className="user-info">
      <div className="username">
        <span className="field">Username:</span><span className="value">{user.username}</span>
      </div>
      <div className="password">
        <span className="field">Password:</span><span className="value">**********</span>
      </div>
      <div className="email">
        <span className="field">Email:</span><span className="value">{user.email}</span>
      </div>
      <div className="first-name">
        <span className="field">First name:</span><span className="value">{user.firstName}</span>
      </div>
      <div className="last-name">
        <span className="field">Last name:</span><span className="value">{user.lastName}</span>
      </div>
      <input type="button" value="Edit info" onClick={routeToEditUser} />
    </div>
  );
}

UserInfo.propTypes = propTypes;