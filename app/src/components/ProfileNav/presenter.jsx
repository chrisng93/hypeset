import React, { Component, PropTypes as T } from 'react';

export default function ProfileNav({ routeToUserInfo, routeToEditUser, routeToEditBrands }) {
  return (
    <div className="profile-nav">
      <div className="title" onClick={routeToUserInfo}>Profile</div>
      <div className="edit-user-nav" onClick={routeToEditUser}>Edit user</div>
      <div className="edit-brands-nav" onClick={routeToEditBrands}>Edit brands</div>
    </div>
  );
}

ProfileNav.propTypes = {
  routeToUserInfo: T.func,
  routeToEditUser: T.func,
  routeToEditBrands: T.func,
};
