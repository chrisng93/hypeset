import React, { Component, PropTypes as T } from 'react';
import ProfileNav from '../ProfileNav';

const propTypes = {
  children: T.node.isRequired,
};

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

Profile.propTypes = propTypes;
