import { auth, signUp, logout, editUser } from './userActions';
import { getAllBrands, getUserBrands, getBrandsByPopularity, addBrand, removeBrand, getBrandInfos } from './brandActions';
import { getAllNews, getOwnNews } from './newsActions';
import { getAllSales, getOwnSales } from './salesActions';

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
  getBrandInfos,
  getAllNews,
  getOwnNews,
  getAllSales,
  getOwnSales,
};
