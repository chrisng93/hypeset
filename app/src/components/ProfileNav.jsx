import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  routeToUserInfo: T.func.isRequired,
  routeToEditBrands: T.func.isRequired,
};

export default function ProfileNav(props) {
  const { routeToUserInfo, routeToEditBrands } = props;
  return (
    <ul className="profile-nav">
      <a className="profile-nav-header">Profile</a>
      <a className="profile-nav-user" onClick={routeToUserInfo}>User</a>
      <a className="profile-nav-brands" onClick={routeToEditBrands}>Brands</a>
    </ul>
  );
}

ProfileNav.propTypes = propTypes;
