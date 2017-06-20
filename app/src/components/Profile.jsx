/**
 * "Dumb" component for profile
 */

import React, { Component, PropTypes as T } from 'react';
import EditUser from './EditUser';

const propTypes = {
  children: T.node,
  availableBrands: T.array.isRequired,
  userBrands: T.array.isRequired,
  popularBrands: T.array.isRequired,
  token: T.string.isRequired,
  user: T.object.isRequired,
  error: T.object.isRequired,

  onEditUser: T.func.isRequired,
  getAllBrands: T.func.isRequired,
  addBrand: T.func.isRequired,
  removeBrand: T.func.isRequired,
  getOwnNews: T.func.isRequired,
  getOwnSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
  routeToEditBrands: T.func.isRequired,
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.renderChild = this.renderChild.bind(this);
  }

  renderChild() {
    const { token, availableBrands, userBrands, popularBrands, getAllBrands, getBrandsByPopularity,
      addBrand, removeBrand, getOwnNews, getOwnSales, user, error, onEditUser, routeToProfile, children } = this.props;
    const editUserProps = { user, token, error, onEditUser, routeToProfile };
    const editBrandProps = { token, availableBrands, userBrands, popularBrands, getAllBrands,
      getBrandsByPopularity, addBrand, removeBrand, getOwnNews, getOwnSales };

    const childrenWithProps = React.Children.map(children, (child) => {
      const componentName = child.type.name;
      const childProps = componentName === 'EditUser' ? editUserProps : editBrandProps;
      return React.cloneElement(child, childProps);
    });

    if (children) {
      return (childrenWithProps);
    }
    return (
      <EditUser {...editUserProps} />
    );
  }

  render() {
    return (
      <section className="profile">
        {this.renderChild()}
      </section>
    );
  }
}

Profile.propTypes = propTypes;
