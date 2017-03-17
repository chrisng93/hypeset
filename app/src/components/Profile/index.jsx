import React, { Component, PropTypes as T } from 'react';
import ProfileNav from '../ProfileNav';

export default function Profile({ children }) {
  return (
    <div className="profile">
      <ProfileNav />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

Profile.propTypes = {};
