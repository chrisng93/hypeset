import React, { PropTypes as T } from 'react';

const propTypes = {
  user: T.object,
  routeToEditUser: T.func,
};

export default function UserInfo(props) {
  const { user, routeToEditUser } = props;
  return (
    <section className="user-info-container">
      <form className="user-info">
        <label className="user-info-username">
          <span className="field">Username:</span>
          <span className="value">{user.username}</span>
        </label>
        <label className="user-info-password">
          <span className="field">Password:</span>
          <span className="value">**********</span>
        </label>
        <label className="user-info-email">
          <span className="field">Email:</span>
          <span className="value">{user.email}</span>
        </label>
        <label className="user-info-first-name">
          <span className="field">First name:</span>
          <span className="value">{user.firstName}</span>
        </label>
        <label className="user-info-last-name">
          <span className="field">Last name:</span>
          <span className="value">{user.lastName}</span>
        </label>
        <button onClick={routeToEditUser}>Edit Info</button>
      </form>
      <img src="https://s3-us-west-1.amazonaws.com/hypeset/profile-1.jpg" />
    </section>
  );
}

UserInfo.propTypes = propTypes;
