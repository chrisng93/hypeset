import React, { Component, PropTypes as T } from 'react';
import ProfileNav from './ProfileNav';
import UserInfo from './UserInfo';

const propTypes = {
  children: T.node,
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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.renderChild = this.renderChild.bind(this);
  }

  renderChild() {
    const { token, availableBrands, userBrands, popularBrands, getAllBrands, getBrandsByPopularity,
      addBrand, removeBrand, user, onEditUser, routeToProfile, routeToEditUser, children } = this.props;
    const userInfoProps = { user, routeToEditUser };
    const editUserProps = { user, token, onEditUser, routeToProfile };
    const editBrandProps = { token, availableBrands, userBrands, popularBrands, getAllBrands, getBrandsByPopularity, addBrand, removeBrand };
    const childrenWithProps = React.Children.map(children, (child) => {
      let childProps;
      const componentName = child.type.name;
      if (componentName === 'EditUser') {
        childProps = editUserProps;
      } else {
        childProps = editBrandProps;
      }
      return React.cloneElement(child, childProps);
    });

    if (children) {
      return (childrenWithProps);
    }
    return (
      <UserInfo {...userInfoProps} />
    );
  }

  render() {
    const { routeToUserInfo, routeToEditUser, routeToEditBrands } = this.props;
    const profileNavProps = { routeToUserInfo, routeToEditUser, routeToEditBrands };
    return (
      <section className="profile">
        <ProfileNav {...profileNavProps} />
        <section className="content">
          {this.renderChild()}
        </section>
      </section>
    );
  }
}

Profile.propTypes = propTypes;
