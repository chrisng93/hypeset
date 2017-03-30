import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  routeToUserInfo: T.func.isRequired,
  routeToEditBrands: T.func.isRequired,
};

export default function ProfileNav(props) {
  const { routeToUserInfo, routeToEditBrands } = props;
  return (
    <ul className="profile-nav">
      <section className="profile-nav-title">
        <h1>Profile</h1>
        <ul className="profile-nav-tabs">
          <li className="profile-nav-tabs-user" onClick={routeToUserInfo}>User</li>
          <li className="profile-nav-tabs-brands" onClick={routeToEditBrands}>Brands</li>
        </ul>
      </section>
    </ul>
  );
}

ProfileNav.propTypes = propTypes;
