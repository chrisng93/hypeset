import { auth, signUp, logout, editUser } from './userActions';
import { getAllBrands, getUserBrands, getBrandsByPopularity, addBrand, removeBrand, getBrandInfos, resetBrandInfos } from './brandActions';
import { getAllNews, getOwnNews } from './newsActions';
import { getAllSales, getOwnSales } from './salesActions';
import { routeToSignInModal, exitSignInModal, routeToSignedOutModal, exitSignedOutModal } from './modalActions';

module.exports = {
  // user actions
  auth,
  signUp,
  logout,
  editUser,

  // brand actions
  getAllBrands,
  getUserBrands,
  getBrandsByPopularity,
  addBrand,
  removeBrand,
  getBrandInfos,
  resetBrandInfos,

  // news actions
  getAllNews,
  getOwnNews,

  // sales actions
  getAllSales,
  getOwnSales,

  // modal actions
  routeToSignInModal,
  exitSignInModal,
  routeToSignedOutModal,
  exitSignedOutModal,
};
