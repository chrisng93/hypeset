import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  routeToUserInfo: T.func.isRequired,
  routeToEditUser: T.func.isRequired,
  routeToEditBrands: T.func.isRequired,
};

export default function ProfileNav({ routeToUserInfo, routeToEditUser, routeToEditBrands }) {
  return (
    <div className="profile-nav">
      <div className="title" onClick={routeToUserInfo}>Profile</div>
      <div className="edit-user-nav" onClick={routeToEditUser}>Edit user</div>
      <div className="edit-brands-nav" onClick={routeToEditBrands}>Edit brands</div>
    </div>
  );
}

ProfileNav.propTypes = propTypes;
