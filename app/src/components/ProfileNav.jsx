/**
 * Stateless component for profile navigation
 */

import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  routeToEditUser: T.func.isRequired,
  routeToEditBrands: T.func.isRequired,
};

export default function ProfileNav(props) {
  const { routeToEditUser, routeToEditBrands } = props;
  return (
    <ul className="profile-nav">
      <section className="profile-nav-title">
        <h1>
          Profile
        </h1>
        <ul className="profile-nav-tabs">
          <li className="profile-nav-tabs-user" onClick={routeToEditUser}>
            User
          </li>
          <li className="profile-nav-tabs-brands" onClick={routeToEditBrands}>
            Brands
          </li>
        </ul>
      </section>
    </ul>
  );
}

ProfileNav.propTypes = propTypes;
