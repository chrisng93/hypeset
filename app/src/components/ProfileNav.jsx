import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  routeToUserInfo: T.func.isRequired,
  routeToEditUser: T.func.isRequired,
  routeToEditBrands: T.func.isRequired,
};

export default function ProfileNav(props) {
  const { routeToUserInfo, routeToEditUser, routeToEditBrands } = props;
  return (
    <ul className="profile-nav">
      <a className="profile-nav-user-info" onClick={routeToUserInfo}>Profile</a>
      <a className="profile-nav-edit-user" onClick={routeToEditUser}>Edit user</a>
      <a className="profile-nav-edit-brands" onClick={routeToEditBrands}>Edit brands</a>
    </ul>
  );
}

ProfileNav.propTypes = propTypes;
