/**
 * Stateful container for profile
 */

import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { userBrandsSelector, availableBrandsSelector, brandsByPopularitySelector } from '../selectors/brandSelectors';
import { userSelector, tokenSelector, userErrorSelector } from '../selectors/userSelectors';
import Profile from '../components/Profile';
import ProfileNav from '../components/ProfileNav';

const propTypes = {
  availableBrands: T.array.isRequired,
  userBrands: T.array.isRequired,
  popularBrands: T.array.isRequired,
  token: T.string.isRequired,
  error: T.object.isRequired,
  user: T.object.isRequired,

  getAllBrands: T.func.isRequired,
  getBrandsByPopularity: T.func.isRequired,
  addBrand: T.func.isRequired,
  removeBrand: T.func.isRequired,
  onEditUser: T.func.isRequired,
  getOwnNews: T.func.isRequired,
  getOwnSales: T.func.isRequired,
  routeToProfile: T.func.isRequired,
  routeToEditUser: T.func.isRequired,
  routeToEditBrands: T.func.isRequired,
};

function ProfileContainer(props) {
  const { routeToEditUser, routeToEditBrands } = props;
  const profileNavProps = { routeToEditUser, routeToEditBrands };
  return (
    <section className="profile-container">
      <ProfileNav {...profileNavProps} />
      <section className="content">
        <Profile {...props} />
      </section>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    availableBrands: availableBrandsSelector(state),
    userBrands: userBrandsSelector(state),
    popularBrands: brandsByPopularitySelector(state),
    token: tokenSelector(state),
    user: userSelector(state),
    error: userErrorSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllBrands: bindActionCreators(actions.getAllBrands, dispatch),
    getBrandsByPopularity: bindActionCreators(actions.getBrandsByPopularity, dispatch),
    addBrand: bindActionCreators(actions.addBrand, dispatch),
    removeBrand: bindActionCreators(actions.removeBrand, dispatch),
    onEditUser: bindActionCreators(actions.editUser, dispatch),
    getOwnNews: bindActionCreators(actions.getOwnNews, dispatch),
    getOwnSales: bindActionCreators(actions.getOwnSales, dispatch),
    routeToProfile: () => dispatch(push('/profile')),
    routeToEditUser: () => dispatch(push('/profile/edit')),
    routeToEditBrands: () => dispatch(push('/profile/brands')),
  };
}

ProfileContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
