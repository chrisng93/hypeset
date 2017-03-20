import { auth, signUp, logout, editUser } from './userActions';
import { getAllBrands, getUserBrands, getBrandsByPopularity, addBrand, removeBrand } from './brandActions';
import getNews from './newsActions';
import getSales from './salesActions';

module.exports = {
  auth,
  signUp,
  logout,
  editUser,
  getAllBrands,
  getUserBrands,
  getBrandsByPopularity,
  addBrand,
  removeBrand,
  getNews,
  getSales,
};
