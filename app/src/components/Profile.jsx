import React, { Component, PropTypes as T } from 'react';
import ProfileNav from './ProfileNav';

const propTypes = {
  children: T.node.isRequired,
  availableBrands: T.array.isRequired,
  userBrands: T.array.isRequired,
  popularBrands: T.array.isRequired,
  token: T.string.isRequired,
  user: T.object.isRequired,
  onEditUser: T.func.isRequired,
  getAllBrands: T.func.isRequired,
  addBrand: T.func.isRequired,
  removeBrand: T.func.isRequired,
  routeToProfile: T.func.isRequired,
  routeToUserInfo: T.func.isRequired,
  routeToEditUser: T.func.isRequired,
  routeToEditBrands: T.func.isRequired,
};

export default function Profile(props) {
  const { token, availableBrands, userBrands, popularBrands, getAllBrands, getBrandsByPopularity,
    addBrand, removeBrand, user, onEditUser, routeToProfile, routeToUserInfo, routeToEditUser, routeToEditBrands, children } = props;
  const profileNavProps = { routeToUserInfo, routeToEditUser, routeToEditBrands };
  const userInfoProps = { user, routeToEditUser };
  const editUserProps = { user, token, onEditUser, routeToProfile };
  const editBrandProps = { token, availableBrands, userBrands, popularBrands, getAllBrands, getBrandsByPopularity, addBrand, removeBrand };
  const childrenWithProps = React.Children.map(children, (child) => {
    let childProps = null;
    const componentName = child.type.name;
    if (componentName === 'UserInfo') {
      childProps = userInfoProps;
    } else if (componentName === 'EditUser') {
      childProps = editUserProps;
    } else {
      childProps = editBrandProps;
    }
    return React.cloneElement(child, childProps);
  });
  return (
    <div className="profile">
      <ProfileNav {...profileNavProps} />
      <div className="content">
        {childrenWithProps}
      </div>
    </div>
  );
}

Profile.propTypes = propTypes;
