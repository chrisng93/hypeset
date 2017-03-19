import auth from './authActions';
import signUp from './signUpActions';
import editUser from './editUserActions';
import { getAllBrands, getUserBrands, getBrandsByPopularity, addBrand, removeBrand } from './brandActions';
import getNews from './newsActions';
import getSales from './salesActions';

module.exports = {
  auth,
  signUp,
  editUser,
  getAllBrands,
  getUserBrands,
  getBrandsByPopularity,
  addBrand,
  removeBrand,
  getNews,
  getSales,
};
