import React, { Component, PropTypes as T } from 'react';

export default function ProfileNav({ routeToEditUser, routeToEditBrands }) {
  return (
    <div className="profile-nav">
      <div className="title">Profile</div>
      <div className="edit-user" onClick={routeToEditUser}>Edit user</div>
      <div className="edit-brands" onClick={routeToEditBrands}>Edit brands</div>
    </div>
  );
}

ProfileNav.propTypes = {
  routeToEditUser: T.func,
  routeToEditBrands: T.func,
};
